/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.0
Code generated at time stamp: 2019-05-31T07:35:28.460
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { PlanoConta } from './planoconta.model';
import { PlanoContaService } from './planoconta.service';
import { FinanceiroPlanoContasTranslationService } from './../i18n/financeiro-planocontas-translation.service';

import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { TipoPlanoContaFinanceiro } from './../enums/financeiro-planocontas-enums.model';

import { TipoReceitaDespesa } from './../enums/financeiro-planocontas-enums.model';

@Component({
  selector: 'app-crud-planoconta.component',
  templateUrl: './crud-planoconta.component.html',
  styleUrls: ['./crud-planoconta.component.css']
})

export class PlanoContaComponent implements OnInit {
	planoConta = new PlanoConta();
	planoContaPlanoContaPaiAutoCompleteSuggestions: PlanoContaAutoComplete[];
	planoContaTipoFinanceiroOptions: TipoPlanoContaFinanceiro[];
	
	
	planoContaTipoReceitaDespesaOptions: TipoReceitaDespesa[];
	
	constructor(
	    private planoContaService: PlanoContaService,
	    private financeiroPlanoContasTranslationService: FinanceiroPlanoContasTranslationService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) { 
		this.initializePlanoContaTipoFinanceiroOptions();
		
		this.initializePlanoContaTipoReceitaDespesaOptions();
	}
	
	ngOnInit() {
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getPlanoContaById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.planoConta = new PlanoConta();
	    }.bind(this), 1);
	}
	
	validateAllFormFields(form: FormGroup) {
	    Object.keys(form.controls).forEach(field => {
	      const control = form.get(field);
	
	      if (control instanceof FormControl) {
	        control.markAsDirty({ onlySelf: true });
	      } else if (control instanceof FormGroup) {
	        this.validateAllFormFields(control);
	      }
	    });
	}
	
	save(form: FormControl) {
		if (!form.valid) {
	      this.validateAllFormFields(form);
	      return;
	    }
		    
	    if (this.isEditing) {
	      this.update();
	    } else {
	      this.create();
	    }
	}
	
	create() {
	    this.planoContaService.create(this.planoConta)
	    .then((planoConta) => {
	      this.planoConta = planoConta;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}
	
	update() {
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
	    .then((planoConta) => this.planoConta = planoConta)
	    .catch(error => {
	      this.showError('Erro ao buscar registro: ' + id);
	    });
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
	
}
