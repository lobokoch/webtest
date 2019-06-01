/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.1
Code generated at time stamp: 2019-06-01T10:38:43.216
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { PlanoContaService } from './planoconta.service';
import { FinanceiroPlanoContasTranslationService } from './../i18n/financeiro-planocontas-translation.service';
import { PlanoConta } from './planoconta.model';
import { PlanoContaListFilter } from './planoconta.model';
import { SortField } from './planoconta.model';
import { PlanoContaCodigoAutoComplete } from './planoconta.model';
import { PlanoContaDescricaoAutoComplete } from './planoconta.model';

import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

@Component({
  selector: 'app-list-planoconta.component',
  templateUrl: './list-planoconta.component.html',
  styleUrls: ['./list-planoconta.component.css']
})

export class PlanoContaListComponent implements OnInit {
	
	planoContaListItems: PlanoConta[];
	planoContaListTotalElements = 0;
	planoContaListFilter = new PlanoContaListFilter();
	
	planoContaCodigoAutoCompleteSuggestions: PlanoContaCodigoAutoComplete[];
	planoContaDescricaoAutoCompleteSuggestions: PlanoContaDescricaoAutoComplete[];
	
	
	
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	/*
	planoConta: PlanoConta;
	totaisFiltroContaPagar = new TotaisFiltroContaPagar(0.0, 0.0);
	mostrarDialogPagarConta = false;
	*/
	
	constructor(
	    private planoContaService: PlanoContaService,
	    private financeiroPlanoContasTranslationService: FinanceiroPlanoContasTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
    	this.planoContaListFilter.sortField = new SortField('codigo', 1); // asc
		
		this.planoContaListFilter.ativoIsNotNull = true;
		
		this.planoContaListFilter.ativoIsNull = false;
		
	    // this.planoConta = new PlanoConta();
        // this.contaPagar.dataPagamento = moment().toDate();
	}
	
	planoContaList(pageNumber = 0) {
	    this.planoContaListFilter.pageNumber = pageNumber;
	    this.planoContaService
	    .planoContaList(this.planoContaListFilter)
	    .then(result => {
	      	this.planoContaListItems = result.items;
	      	this.planoContaListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	planoContaFilterSearch() {
	    this.planoContaList(0);
	}
	
	deletePlanoConta(planoConta: PlanoConta) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.planoContaService.delete(planoConta.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.planoContaList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError('Erro ao excluir registro: ' + e);
	        });
	      }
	    });
	}
	
	planoContaListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.planoContaListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.planoContaListFilter.sortField = new SortField('codigo', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.planoContaList(pageNumber);
	}
	
	planoContaCodigoAutoComplete(event) {
	    const query = event.query;
	    this.planoContaService.planoContaCodigoAutoComplete(query)
	    .then((result) => {
	      this.planoContaCodigoAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	planoContaDescricaoAutoComplete(event) {
	    const query = event.query;
	    this.planoContaService.planoContaDescricaoAutoComplete(query)
	    .then((result) => {
	      this.planoContaDescricaoAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	planoContaPlanoContaPaiAutoCompleteFieldConverter(planoContaPai: PlanoContaAutoComplete) {
		if (planoContaPai) {
			return planoContaPai.codigo + ' - ' + planoContaPai.descricao;
		} else {
			return null;
		}
	}
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroPlanoContasTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	/*********************
	getContaCssClass(conta: ContaPagar): string {
	    const vencimento = conta.dataVencimento;
	    const emAberto = conta.dataPagamento == null;
	    const hoje = moment();
	    if (vencimento && emAberto) {
	      if (moment(vencimento).isBefore(hoje, 'day')) {
	        return 'conta-vencida';
	      }
	      if (moment(vencimento).isSame(hoje, 'day')) {
	        return 'conta-vence-hoje';
	      }
	      if (moment(vencimento).isSame(moment().add(1, 'day'), 'day')) {
	        return 'conta-vence-amanha';
	      }
	      if (moment(vencimento).isBefore(moment().add(1, 'week').startOf('week'), 'day')) {
	        return 'conta-vence-essa-semana';
	      }
	    }
	    return 'conta-ok';
	}
	
	get getTotalGeralContasPagar(): number {
	    const total = this.totaisFiltroContaPagar.totalValorPagar - this.totaisFiltroContaPagar.totalValorPago;
	    return total ? total : 0.0;
	}
	  
	get getTotalValorPagar(): number {
	    const total = this.totaisFiltroContaPagar.totalValorPagar;
	    return total ? total : 0.0;
	}
	
	get getTotalValorPago(): number {
		const total = this.totaisFiltroContaPagar.totalValorPago;
		return total ? total : 0.0;
	}
	
	getTotaisFiltroContaPagar() {
	    this.contasPagarService.getTotaisFiltroContaPagar(this.contaPagarListFilter)
	    .then(response => {
	      this.totaisFiltroContaPagar = response;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar totais:' + erro);
	    });
	}
	
	mostrarPagarConta(conta: ContaPagar) {
	    this.contaPagar = new ContaPagar();
	    this.contaPagar.assign(conta);
	    // this.contaPagar.dataPagamento = new Date(this.contaPagar.dataPagamento);
	    const data = this.contaPagar.dataPagamento;
	    if (data == null) {
	      this.contaPagar.dataPagamento = moment().toDate();
	    } else {
	      this.contaPagar.dataPagamento = moment(this.contaPagar.dataPagamento).toDate();
	    }
	    if (!this.contaPagar.valorPago || this.contaPagar.valorPago === 0) {
	      this.contaPagar.valorPago = conta.valor;
	    }
	    this.mostrarDialogPagarConta = true;
	}
	
	cancelarPagarConta() {
		this.mostrarDialogPagarConta = false;
	}
	
	executarPagarConta() {
	    this.contasPagarService.update(this.contaPagar)
	    .then((contaPagar) => {
	      this.mostrarDialogPagarConta = false;
	      this.messageHandler.showSuccess(`A conta ${contaPagar.descricao} foi paga.`);
	      this.contaPagarList(0);
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao pagar a conta: ' + erro);
	    });
	}
	*********************/
}
