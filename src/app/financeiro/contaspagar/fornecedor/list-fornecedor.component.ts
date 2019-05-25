
import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { FornecedorService } from './fornecedor.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';
import { Fornecedor } from './fornecedor.model';
import { FornecedorListFilter } from './fornecedor.model';
import { SortField } from './fornecedor.model';
import { FornecedorNomeAutoComplete } from './fornecedor.model';

@Component({
  selector: 'app-list-fornecedor.component',
  templateUrl: './list-fornecedor.component.html',
  styleUrls: ['./list-fornecedor.component.css']
})

export class FornecedorListComponent implements OnInit {
	
	fornecedorListItems: Fornecedor[];
	fornecedorListTotalElements = 0;
	fornecedorListFilter = new FornecedorListFilter();
	
	fornecedorNomeAutoCompleteSuggestions: FornecedorNomeAutoComplete[];
	dateFilterIntervalDropdownItems: SelectItem[];
	
	
	/*
	fornecedor: Fornecedor;
	totaisFiltroContaPagar = new TotaisFiltroContaPagar(0.0, 0.0);
	mostrarDialogPagarConta = false;
	*/
	
	constructor(
	    private fornecedorService: FornecedorService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
    	this.fornecedorListFilter.sortField = new SortField('nome', 1); // asc
	    // this.fornecedor = new Fornecedor();
        // this.contaPagar.dataPagamento = moment().toDate();
	}
	
	fornecedorList(pageNumber = 0) {
	    this.fornecedorListFilter.pageNumber = pageNumber;
	    this.fornecedorService
	    .fornecedorList(this.fornecedorListFilter)
	    .then(result => {
	      	this.fornecedorListItems = result.items;
	      	this.fornecedorListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	fornecedorFilterSearch() {
	    this.fornecedorList(0);
	}
	
	deleteFornecedor(fornecedor: Fornecedor) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.fornecedorService.delete(fornecedor.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.fornecedorList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError('Erro ao excluir registro: ' + e);
	        });
	      }
	    });
	}
	
	fornecedorListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.fornecedorListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.fornecedorListFilter.sortField = new SortField('nome', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.fornecedorList(pageNumber);
	}
	
	fornecedorNomeAutoComplete(event) {
	    const query = event.query;
	    this.fornecedorService.fornecedorNomeAutoComplete(query)
	    .then((result) => {
	      this.fornecedorNomeAutoCompleteSuggestions = result;
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
