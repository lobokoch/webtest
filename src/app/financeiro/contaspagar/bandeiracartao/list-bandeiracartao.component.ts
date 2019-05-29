/**********************************************************************************************
Code generated with MKL Plug-in version: 3.0.2
Code generated at time stamp: 2019-05-28T21:35:52.612
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { BandeiraCartaoService } from './bandeiracartao.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';
import { BandeiraCartao } from './bandeiracartao.model';
import { BandeiraCartaoListFilter } from './bandeiracartao.model';
import { SortField } from './bandeiracartao.model';
import { BandeiraCartaoNomeBandeiraAutoComplete } from './bandeiracartao.model';

@Component({
  selector: 'app-list-bandeiracartao.component',
  templateUrl: './list-bandeiracartao.component.html',
  styleUrls: ['./list-bandeiracartao.component.css']
})

export class BandeiraCartaoListComponent implements OnInit {
	
	bandeiraCartaoListItems: BandeiraCartao[];
	bandeiraCartaoListTotalElements = 0;
	bandeiraCartaoListFilter = new BandeiraCartaoListFilter();
	
	bandeiraCartaoNomeBandeiraAutoCompleteSuggestions: BandeiraCartaoNomeBandeiraAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	/*
	bandeiraCartao: BandeiraCartao;
	totaisFiltroContaPagar = new TotaisFiltroContaPagar(0.0, 0.0);
	mostrarDialogPagarConta = false;
	*/
	
	constructor(
	    private bandeiraCartaoService: BandeiraCartaoService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
    	this.bandeiraCartaoListFilter.sortField = new SortField('nomeBandeira', 1); // asc
	    // this.bandeiraCartao = new BandeiraCartao();
        // this.contaPagar.dataPagamento = moment().toDate();
	}
	
	bandeiraCartaoList(pageNumber = 0) {
	    this.bandeiraCartaoListFilter.pageNumber = pageNumber;
	    this.bandeiraCartaoService
	    .bandeiraCartaoList(this.bandeiraCartaoListFilter)
	    .then(result => {
	      	this.bandeiraCartaoListItems = result.items;
	      	this.bandeiraCartaoListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	bandeiraCartaoFilterSearch() {
	    this.bandeiraCartaoList(0);
	}
	
	deleteBandeiraCartao(bandeiraCartao: BandeiraCartao) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.bandeiraCartaoService.delete(bandeiraCartao.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.bandeiraCartaoList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError('Erro ao excluir registro: ' + e);
	        });
	      }
	    });
	}
	
	bandeiraCartaoListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.bandeiraCartaoListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.bandeiraCartaoListFilter.sortField = new SortField('nomeBandeira', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.bandeiraCartaoList(pageNumber);
	}
	
	bandeiraCartaoNomeBandeiraAutoComplete(event) {
	    const query = event.query;
	    this.bandeiraCartaoService.bandeiraCartaoNomeBandeiraAutoComplete(query)
	    .then((result) => {
	      this.bandeiraCartaoNomeBandeiraAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.financeiroContasPagarTranslationService.getTranslation(key);
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
