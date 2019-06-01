/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.1
Code generated at time stamp: 2019-06-01T10:39:13.215
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { BancoService } from './banco.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import { Banco } from './banco.model';
import { BancoListFilter } from './banco.model';
import { SortField } from './banco.model';
import { BancoNomeAutoComplete } from './banco.model';

@Component({
  selector: 'app-list-banco.component',
  templateUrl: './list-banco.component.html',
  styleUrls: ['./list-banco.component.css']
})

export class BancoListComponent implements OnInit {
	
	bancoListItems: Banco[];
	bancoListTotalElements = 0;
	bancoListFilter = new BancoListFilter();
	
	bancoNomeAutoCompleteSuggestions: BancoNomeAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	/*
	banco: Banco;
	totaisFiltroContaPagar = new TotaisFiltroContaPagar(0.0, 0.0);
	mostrarDialogPagarConta = false;
	*/
	
	constructor(
	    private bancoService: BancoService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
    	this.bancoListFilter.sortField = new SortField('numero', 1); // asc
	    // this.banco = new Banco();
        // this.contaPagar.dataPagamento = moment().toDate();
	}
	
	bancoList(pageNumber = 0) {
	    this.bancoListFilter.pageNumber = pageNumber;
	    this.bancoService
	    .bancoList(this.bancoListFilter)
	    .then(result => {
	      	this.bancoListItems = result.items;
	      	this.bancoListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	bancoFilterSearch() {
	    this.bancoList(0);
	}
	
	deleteBanco(banco: Banco) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.bancoService.delete(banco.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.bancoList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError('Erro ao excluir registro: ' + e);
	        });
	      }
	    });
	}
	
	bancoListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.bancoListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.bancoListFilter.sortField = new SortField('numero', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.bancoList(pageNumber);
	}
	
	bancoNomeAutoComplete(event) {
	    const query = event.query;
	    this.bancoService.bancoNomeAutoComplete(query)
	    .then((result) => {
	      this.bancoNomeAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	
	
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosBancoTranslationService.getTranslation(key);
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
