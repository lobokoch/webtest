
import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { ContaPagarService } from './contapagar.service';
import { KerubinClientesTranslationService } from './../i18n/kerubin-clientes-translation.service';
import { ContaPagar } from './contapagar.model';
import { ContaPagarListFilter } from './contapagar.model';
import { SortField } from './contapagar.model';
import { ContaPagarDescricaoAutoComplete } from './contapagar.model';
import { ContaPagarAgrupadorAutoComplete } from './contapagar.model';

import { ContaBancariaAutoComplete } from './../contabancaria/contabancaria.model';

import { CartaoCreditoAutoComplete } from './../cartaocredito/cartaocredito.model';

import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';
import { ContaPagarSumFields } from './contapagar.model';

@Component({
  selector: 'app-list-contapagar.component',
  templateUrl: './list-contapagar.component.html',
  styleUrls: ['./list-contapagar.component.css']
})

export class ContaPagarListComponent implements OnInit {
	
	contaPagarListItems: ContaPagar[];
	contaPagarListTotalElements = 0;
	contaPagarListFilter = new ContaPagarListFilter();
	
	contaPagarDescricaoAutoCompleteSuggestions: ContaPagarDescricaoAutoComplete[];
	
	contaPagarDataVencimentoIsBetweenOptionsSelected: SelectItem = {label: 'Este ano', value: '6'};
	
	
	
	
	contaPagarAgrupadorAutoCompleteSuggestions: ContaPagarAgrupadorAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	contaPagarSumFields = new ContaPagarSumFields();
	
	/*
	contaPagar: ContaPagar;
	totaisFiltroContaPagar = new TotaisFiltroContaPagar(0.0, 0.0);
	mostrarDialogPagarConta = false;
	*/
	
	constructor(
	    private contaPagarService: ContaPagarService,
	    private kerubinClientesTranslationService: KerubinClientesTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
    	this.contaPagarListFilter.sortField = new SortField('descricao', 1); // asc
		this.initializeDateFilterIntervalDropdownItems();
		
		
		
		this.contaPagarListFilter.dataPagamentoIsNotNull = false;
		
		this.contaPagarListFilter.dataPagamentoIsNull = true;
		
	    // this.contaPagar = new ContaPagar();
        // this.contaPagar.dataPagamento = moment().toDate();
	}
	
	contaPagarList(pageNumber = 0) {
	    this.contaPagarListFilter.pageNumber = pageNumber;
	    this.contaPagarService
	    .contaPagarList(this.contaPagarListFilter)
	    .then(result => {
	      	this.contaPagarListItems = result.items;
	      	this.contaPagarListTotalElements = result.totalElements;
	      
			this.getContaPagarSumFields();
	    });
		
	}
	
	getContaPagarSumFields() {
	    this.contaPagarService.getContaPagarSumFields(this.contaPagarListFilter)
		.then(response => {
		  this.contaPagarSumFields = response;
		})
		.catch(error => {
		  this.messageHandler.showError('Erro ao buscar totais:' + error);
		});
	}
	
	contaPagarFilterSearch() {
	    this.contaPagarList(0);
	}
	
	deleteContaPagar(contaPagar: ContaPagar) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.contaPagarService.delete(contaPagar.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.contaPagarList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError('Erro ao excluir registro: ' + e);
	        });
	      }
	    });
	}
	
	contaPagarListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.contaPagarListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.contaPagarListFilter.sortField = new SortField('descricao', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.contaPagarList(pageNumber);
	}
	
	contaPagarDescricaoAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarService.contaPagarDescricaoAutoComplete(query)
	    .then((result) => {
	      this.contaPagarDescricaoAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	contaPagarAgrupadorAutoComplete(event) {
	    const query = event.query;
	    this.contaPagarService.contaPagarAgrupadorAutoComplete(query)
	    .then((result) => {
	      this.contaPagarAgrupadorAutoCompleteSuggestions = result;
	    })
	    .catch(erro => {
	      this.messageHandler.showError('Erro ao buscar registros com o termo: ' + query);
	    });
	}
	
	
	contaPagarContaBancariaAutoCompleteFieldConverter(contaBancaria: ContaBancariaAutoComplete) {
		if (contaBancaria) {
			return contaBancaria.titular + ' - ' + contaBancaria.numeroConta + ' - ' + contaBancaria.digito;
		} else {
			return null;
		}
	}
	
	contaPagarCartaoCreditoAutoCompleteFieldConverter(cartaoCredito: CartaoCreditoAutoComplete) {
		if (cartaoCredito) {
			return cartaoCredito.titular + ' - ' + cartaoCredito.numeroCartao;
		} else {
			return null;
		}
	}
	
	contaPagarFornecedorAutoCompleteFieldConverter(fornecedor: FornecedorAutoComplete) {
		if (fornecedor) {
			return fornecedor.nome;
		} else {
			return null;
		}
	}
	
	
	private initializeDateFilterIntervalDropdownItems() {
		this.dateFilterIntervalDropdownItems = [
		    {label: 'Hoje', value: '0'},
		    {label: 'Amanhã', value: '1'},
		    {label: 'Esta semana', value: '2'},
		    {label: 'Semana que vem', value: '3'},
		    {label: 'Este mês', value: '4'},
		    {label: 'Mês que vem', value: '5'},
		    {label: 'Este ano', value: '6'},
		    {label: 'Ano que vem', value: '7'},
		    // Passado
		    {label: 'Ontem', value: '8'},
		    {label: 'Semana passada', value: '9'},
		    {label: 'Mês passado', value: '10'},
		    {label: 'Ano passado', value: '11'},
		    {label: 'Personalizado', value: '99'}
		  ];
	}
	
	
	contaPagarDataVencimentoIsBetweenOptionsOnClick(dropdown: Dropdown) {
		this.contaPagarListFilter.dataVencimentoFrom = null;
		this.contaPagarListFilter.dataVencimentoTo = null;
		
		let dateFrom = null;
		let dateTo = null;
	
		const valor = Number(this.contaPagarDataVencimentoIsBetweenOptionsSelected.value);
		switch (valor) {
			case 0: // Hoje
				dateFrom = moment();
				dateTo = moment();
				break;
				//
			case 1: // Amanhã
				dateFrom = moment().add(1, 'day');
				dateTo = moment().add(1, 'day');
				break;
				//
			case 2: // Esta semana
				dateFrom = moment().startOf('week');
				dateTo = moment().endOf('week');
				break;
				//
			case 3: // Semana que vem
				dateFrom = moment().add(1, 'week').startOf('week');
				dateTo = moment().add(1, 'week').endOf('week');
				break;
				//
			case 4: // Este mês
				dateFrom = moment().startOf('month');
				dateTo = moment().endOf('month');
				break;
				//
			case 5: // Mês que vem
				dateFrom = moment().add(1, 'month').startOf('month');
				dateTo = moment().add(1, 'month').endOf('month');
				break;
				//
			case 6: // Este ano
				dateFrom = moment().startOf('year');
				dateTo = moment().endOf('year');
				break;
				//
			case 7: // Ano que vem
				dateFrom = moment().add(1, 'year').startOf('year');
				dateTo = moment().add(1, 'year').endOf('year');
				break;
				// Passado
			case 8: // Ontem
				dateFrom = moment().add(-1, 'day');
				dateTo = moment().add(-1, 'day');
				break;
				//
			case 9: // Semana passada
				dateFrom = moment().add(-1, 'week').startOf('week');
				dateTo = moment().add(-1, 'week').endOf('week');
				break;
				//
			case 10: // Mês passado
				dateFrom = moment().add(-1, 'month').startOf('month');
				dateTo = moment().add(-1, 'month').endOf('month');
				break;
				//
			case 11: // Ano passado
				dateFrom = moment().add(-1, 'year').startOf('year');
				dateTo = moment().add(-1, 'year').endOf('year');
				break;
			
			default:
				break;
		} // switch
	
		if (dateFrom != null) {
		  this.contaPagarListFilter.dataVencimentoFrom = dateFrom.toDate();
		}
		
		if (dateTo != null) {
		  this.contaPagarListFilter.dataVencimentoTo = dateTo.toDate();
		}
		
		if (dateFrom != null && dateTo != null) {
		  // this.contaPagarList(0);
		}
	}
	
	applyAndGetRuleGridRowStyleClass(contaPagar: ContaPagar): String {
		
		if (!contaPagar.dataPagamento && moment(contaPagar.dataVencimento).isBefore(moment(), 'day')) {
			return 'kb-conta-vencida';
		}
		
		if (!contaPagar.dataPagamento && moment(contaPagar.dataVencimento).isSame(moment(), 'day')) {
			return 'kb-conta-vence-hoje';
		}
		
		if (!contaPagar.dataPagamento && moment(contaPagar.dataVencimento).isSame(moment().add(1, 'day'), 'day')) {
			return 'kb-conta-vence-amanha';
		}
		
		if (!contaPagar.dataPagamento && moment(contaPagar.dataVencimento).isBetween(moment(), moment().endOf('week'))) {
			return 'kb-conta-vence-esta-semana';
		}
		
		if (contaPagar.dataPagamento) {
			return 'kb-conta-paga';
		}
	
	    return null;
	}
	
	actionBaixarContaComUmCliqueWhen(contaPagar: ContaPagar) {
		return !contaPagar.dataPagamento;
	}
	
	actionBaixarContaComUmClique(contaPagar: ContaPagar) {
		this.contaPagarService.actionBaixarContaComUmClique(contaPagar.id)
			.then(() => {
			  this.messageHandler.showSuccess('Ação executada com sucesso!');
			  this.contaPagarList(0);
			})
			.catch((e) => {
				console.log('Erro ao executar a ação actionBaixarContaComUmClique: ' + e);
			  	this.messageHandler.showError('Não foi possível executar a ação.');
			});
	}
	
	actionEstornarPagamentoContaComUmCliqueWhen(contaPagar: ContaPagar) {
		return contaPagar.dataPagamento;
	}
	
	actionEstornarPagamentoContaComUmClique(contaPagar: ContaPagar) {
		this.contaPagarService.actionEstornarPagamentoContaComUmClique(contaPagar.id)
			.then(() => {
			  this.messageHandler.showSuccess('Ação executada com sucesso!');
			  this.contaPagarList(0);
			})
			.catch((e) => {
				console.log('Erro ao executar a ação actionEstornarPagamentoContaComUmClique: ' + e);
			  	this.messageHandler.showError('Não foi possível executar a ação.');
			});
	}
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.kerubinClientesTranslationService.getTranslation(key);
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
