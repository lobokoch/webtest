/**********************************************************************************************
Code generated with MKL Plug-in version: 3.4.1
Code generated at time stamp: 2019-05-30T20:21:04.449
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { ContaBancariaService } from './contabancaria.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import { ContaBancaria } from './contabancaria.model';
import { ContaBancariaListFilter } from './contabancaria.model';
import { SortField } from './contabancaria.model';
import { ContaBancariaNumeroContaAutoComplete } from './contabancaria.model';

import { AgenciaBancariaAutoComplete } from './../agenciabancaria/agenciabancaria.model';

import { BandeiraCartaoAutoComplete } from './../bandeiracartao/bandeiracartao.model';

@Component({
  selector: 'app-list-contabancaria.component',
  templateUrl: './list-contabancaria.component.html',
  styleUrls: ['./list-contabancaria.component.css']
})

export class ContaBancariaListComponent implements OnInit {
	
	contaBancariaListItems: ContaBancaria[];
	contaBancariaListTotalElements = 0;
	contaBancariaListFilter = new ContaBancariaListFilter();
	
	contaBancariaNumeroContaAutoCompleteSuggestions: ContaBancariaNumeroContaAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	/*
	contaBancaria: ContaBancaria;
	totaisFiltroContaPagar = new TotaisFiltroContaPagar(0.0, 0.0);
	mostrarDialogPagarConta = false;
	*/
	
	constructor(
	    private contaBancariaService: ContaBancariaService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
    	this.contaBancariaListFilter.sortField = new SortField('nomeTitular', 1); // asc
	    // this.contaBancaria = new ContaBancaria();
        // this.contaPagar.dataPagamento = moment().toDate();
	}
	
	contaBancariaList(pageNumber = 0) {
	    this.contaBancariaListFilter.pageNumber = pageNumber;
	    this.contaBancariaService
	    .contaBancariaList(this.contaBancariaListFilter)
	    .then(result => {
	      	this.contaBancariaListItems = result.items;
	      	this.contaBancariaListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	contaBancariaFilterSearch() {
	    this.contaBancariaList(0);
	}
	
	deleteContaBancaria(contaBancaria: ContaBancaria) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.contaBancariaService.delete(contaBancaria.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.contaBancariaList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError('Erro ao excluir registro: ' + e);
	        });
	      }
	    });
	}
	
	contaBancariaListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.contaBancariaListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.contaBancariaListFilter.sortField = new SortField('nomeTitular', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.contaBancariaList(pageNumber);
	}
	
	contaBancariaNumeroContaAutoComplete(event) {
	    const query = event.query;
	    this.contaBancariaService.contaBancariaNumeroContaAutoComplete(query)
	    .then((result) => {
	      this.contaBancariaNumeroContaAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	contaBancariaAgenciaAutoCompleteFieldConverter(agencia: AgenciaBancariaAutoComplete) {
		if (agencia) {
			return agencia.numeroAgencia + ' - ' + agencia.digitoAgencia + ' - ' + agencia.endereco;
		} else {
			return null;
		}
	}
	
	contaBancariaBandeiraCartaoAutoCompleteFieldConverter(bandeiraCartao: BandeiraCartaoAutoComplete) {
		if (bandeiraCartao) {
			return bandeiraCartao.nomeBandeira;
		} else {
			return null;
		}
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
