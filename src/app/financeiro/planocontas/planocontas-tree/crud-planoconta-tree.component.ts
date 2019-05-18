import { PlanoContasTreeService } from './planocontas-tree.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {TreeNode} from 'primeng/api';

import { FinanceiroPlanoContasTranslationService } from '../i18n/financeiro-planocontas-translation.service';

import { PlanoContaAutoComplete, PlanoConta } from '../planoconta/planoconta.model';

import { TipoPlanoContaFinanceiro } from '../enums/financeiro-planocontas-enums.model';

import { TipoReceitaDespesa } from '../enums/financeiro-planocontas-enums.model';
import { PlanoContaService } from '../planoconta/planoconta.service';


@Component({
  selector: 'app-crud-planoconta-tree.component',
  templateUrl: './crud-planoconta-tree.component.html',
  styleUrls: ['./crud-planoconta-tree.component.css']
})

export class PlanoContaTreeComponent implements OnInit {
  planoContasTree: TreeNode[];
  selectedNode: TreeNode;

  planoConta = new PlanoConta();
  planoContaOld = new PlanoConta();
	planoContaPlanoContaPaiAutoCompleteSuggestions: PlanoContaAutoComplete[];
	planoContaTipoFinanceiroOptions: TipoPlanoContaFinanceiro[];


	planoContaTipoReceitaDespesaOptions: TipoReceitaDespesa[];

	constructor(
	    private planoContaService: PlanoContaService,
	    private planoContasTreeService: PlanoContasTreeService,
	    private financeiroPlanoContasTranslationService: FinanceiroPlanoContasTranslationService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) {
		this.initializePlanoContaTipoFinanceiroOptions();

    this.initializePlanoContaTipoReceitaDespesaOptions();

  }

  loadTree() {
    this.planoContasTreeService
      .getPlanoContasTree('')
      .then(nodes => {
        this.planoContasTree = nodes;
      });
  }

	ngOnInit() {
      this.loadTree();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getPlanoContaById(id);
	    }
	}

	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
        // this.planoConta = new PlanoConta();
        this.doNew();
	    }.bind(this), 1);
  }

  doNew() {
    const planoConta = new PlanoConta();
    if (this.planoContaOld) {
      planoConta.codigo = this.planoContaOld.codigo;
      planoConta.planoContaPai = this.planoContaOld;
      planoConta.tipoFinanceiro = this.planoContaOld.tipoFinanceiro;
      planoConta.tipoReceitaDespesa = this.planoContaOld.tipoReceitaDespesa;
    }

    if (this.selectedNode) {
      planoConta.codigo = this.buildNextPlanoContaCodigo(this.selectedNode);
    }

    this.planoConta = planoConta;
  }

  buildNextPlanoContaCodigo(node: TreeNode): string {
    let codigo = '';
    if (node) {
      const parentCodigo = this.getCodigoByNodeLabel(node);
      let strLastValue = '01';
      if (node.children) {
        const lastNode = node.children[node.children.length - 1];
        const lastCodigo = this.getCodigoByNodeLabel(lastNode);
        const values = lastCodigo.split('.');
        strLastValue = values[values.length - 1];
        let intValue = +strLastValue;
        intValue = intValue + 1;
        strLastValue = '' + intValue;
      }
      /*
      1
      1.1
      1.1.1
      1.1.1.01
      */
      const parentGroups = parentCodigo.split('.');
      if (parentGroups.length >= 3) {
        while (strLastValue.length < 2) {
          strLastValue = '0' + strLastValue;
        }
      }

      codigo = parentCodigo + '.' + strLastValue;

    }
    if (codigo.length === 0) {
      codigo = '1';
    }
    return codigo;
  }

  getCodigoByNodeLabel(node: TreeNode) {
    let codigo = '';
    if (node) {
      const label = node.label;
      if (label) {
        codigo = label.substring(0, label.indexOf(' -'));
      }

    }
    return codigo;
  }

	save(form: FormControl) {
	    if (this.isEditing) {
	      this.update(form);
	    } else {
	      this.create(form);
	    }
	}

	create(form: FormControl) {
	    this.planoContaService.create(this.planoConta)
	    .then((planoConta) => {
	      this.planoConta = planoConta;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}

	update(form: FormControl) {
	    this.planoContaService.update(this.planoConta)
	    .then((planoConta) => {
	      this.planoConta = planoConta;
	      this.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.showError('Erro ao atualizar registro: ' + error);
	    });
	}

	getPlanoContaById(id: string) {
	    this.planoContaService.retrieve(id)
      .then((planoConta) => {
        this.planoConta = planoConta;
        this.planoContaOld = this.clonePlanoConta(planoConta);
      })
	    .catch(error => {
	      this.showError('Erro ao buscar registro: ' + id);
	    });
  }

  clonePlanoConta(source: PlanoConta): PlanoConta {
    const cloned = new PlanoConta();
    if (source) {
      cloned.id = source.id;
      cloned.codigo = source.codigo;
      cloned.descricao = source.descricao;
      cloned.ativo = source.ativo;
      cloned.planoContaPai = source.planoContaPai;
      cloned.tipoFinanceiro = source.tipoFinanceiro;
      cloned.tipoReceitaDespesa = source.tipoReceitaDespesa;
    }
    return cloned;
  }

	get isEditing() {
	    return Boolean(this.planoConta.id);
	}

	planoContaPlanoContaPaiAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.planoConta.planoContaPai = null;
	}

	planoContaPlanoContaPaiAutoComplete(event) {
	    const query = event.query;
	    this.planoContaService
	      .autoComplete(query)
	      .then((result) => {
	        this.planoContaPlanoContaPaiAutoCompleteSuggestions = result as PlanoContaAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}

	planoContaPlanoContaPaiAutoCompleteFieldConverter(planoContaPai: PlanoContaAutoComplete) {
		if (planoContaPai) {
			return planoContaPai.codigo + ' - ' + planoContaPai.descricao;
		} else {
			return null;
		}
	}

	private initializePlanoContaTipoFinanceiroOptions() {
	    this.planoContaTipoFinanceiroOptions = [
	    	{ label: this.getTranslation('financeiro.plano_contas.planoConta_tipoFinanceiro_receita'), value: 'RECEITA' },
	    	{ label: this.getTranslation('financeiro.plano_contas.planoConta_tipoFinanceiro_despesa'), value: 'DESPESA' }
	    ];
	}

	private initializePlanoContaTipoReceitaDespesaOptions() {
	    this.planoContaTipoReceitaDespesaOptions = [
	    	{ label: this.getTranslation('financeiro.plano_contas.planoConta_tipoReceitaDespesa_fixo'), value: 'FIXO' },
	    	{ label: this.getTranslation('financeiro.plano_contas.planoConta_tipoReceitaDespesa_variavel'), value: 'VARIAVEL' }
	    ];
	}


	public showSuccess(msg: string) {
	    this.messageService.add({severity: 'success', summary: 'Successo', detail: msg});
	}

	public showError(msg: string) {
	    this.messageService.add({severity: 'error', summary: 'Erro', detail: msg});
	}

	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroPlanoContasTranslationService.getTranslation(key);
		return value;

		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
  }

  /// TREE ////

  nodeSelect(event) {
    this.getPlanoContaById(event.node.key);
    // this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.key});
}

  /////////////

}
