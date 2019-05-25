
import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { AgenciaBancariaService } from './agenciabancaria.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import { AgenciaBancaria } from './agenciabancaria.model';
import { AgenciaBancariaListFilter } from './agenciabancaria.model';
import { SortField } from './agenciabancaria.model';

import { BancoAutoComplete } from './../banco/banco.model';

@Component({
  selector: 'app-list-agenciabancaria.component',
  templateUrl: './list-agenciabancaria.component.html',
  styleUrls: ['./list-agenciabancaria.component.css']
})

export class AgenciaBancariaListComponent implements OnInit {
	
	agenciaBancariaListItems: AgenciaBancaria[];
	agenciaBancariaListTotalElements = 0;
	agenciaBancariaListFilter = new AgenciaBancariaListFilter();
	
	
	
	/*
	agenciaBancaria: AgenciaBancaria;
	totaisFiltroContaPagar = new TotaisFiltroContaPagar(0.0, 0.0);
	mostrarDialogPagarConta = false;
	*/
	
	constructor(
	    private agenciaBancariaService: AgenciaBancariaService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
    	this.agenciaBancariaListFilter.sortField = new SortField('banco', 1); // asc
	    // this.agenciaBancaria = new AgenciaBancaria();
        // this.contaPagar.dataPagamento = moment().toDate();
	}
	
	agenciaBancariaList(pageNumber = 0) {
	    this.agenciaBancariaListFilter.pageNumber = pageNumber;
	    this.agenciaBancariaService
	    .agenciaBancariaList(this.agenciaBancariaListFilter)
	    .then(result => {
	      	this.agenciaBancariaListItems = result.items;
	      	this.agenciaBancariaListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	agenciaBancariaFilterSearch() {
	    this.agenciaBancariaList(0);
	}
	
	deleteAgenciaBancaria(agenciaBancaria: AgenciaBancaria) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.agenciaBancariaService.delete(agenciaBancaria.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.agenciaBancariaList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError('Erro ao excluir registro: ' + e);
	        });
	      }
	    });
	}
	
	agenciaBancariaListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.agenciaBancariaListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.agenciaBancariaListFilter.sortField = new SortField('banco', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.agenciaBancariaList(pageNumber);
	}
	
	
	agenciaBancariaBancoAutoCompleteFieldConverter(banco: BancoAutoComplete) {
		if (banco) {
			return banco.numero + ' - ' + banco.nome;
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
