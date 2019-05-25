
import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, SelectItem} from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import * as moment from 'moment';
import { MessageHandlerService } from 'src/app/core/message-handler.service';

import { CartaoCreditoService } from './cartaocredito.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';
import { CartaoCredito } from './cartaocredito.model';
import { CartaoCreditoListFilter } from './cartaocredito.model';
import { SortField } from './cartaocredito.model';

import { BancoAutoComplete } from './../banco/banco.model';

import { BandeiraCartaoAutoComplete } from './../bandeiracartao/bandeiracartao.model';

@Component({
  selector: 'app-list-cartaocredito.component',
  templateUrl: './list-cartaocredito.component.html',
  styleUrls: ['./list-cartaocredito.component.css']
})

export class CartaoCreditoListComponent implements OnInit {
	
	cartaoCreditoListItems: CartaoCredito[];
	cartaoCreditoListTotalElements = 0;
	cartaoCreditoListFilter = new CartaoCreditoListFilter();
	
	
	
	/*
	cartaoCredito: CartaoCredito;
	totaisFiltroContaPagar = new TotaisFiltroContaPagar(0.0, 0.0);
	mostrarDialogPagarConta = false;
	*/
	
	constructor(
	    private cartaoCreditoService: CartaoCreditoService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private confirmation: ConfirmationService,
	    private messageHandler: MessageHandlerService
	) { }
	
	ngOnInit() {
    	this.cartaoCreditoListFilter.sortField = new SortField('banco', 1); // asc
	    // this.cartaoCredito = new CartaoCredito();
        // this.contaPagar.dataPagamento = moment().toDate();
	}
	
	cartaoCreditoList(pageNumber = 0) {
	    this.cartaoCreditoListFilter.pageNumber = pageNumber;
	    this.cartaoCreditoService
	    .cartaoCreditoList(this.cartaoCreditoListFilter)
	    .then(result => {
	      	this.cartaoCreditoListItems = result.items;
	      	this.cartaoCreditoListTotalElements = result.totalElements;
	      
	    });
		
	}
	
	
	cartaoCreditoFilterSearch() {
	    this.cartaoCreditoList(0);
	}
	
	deleteCartaoCredito(cartaoCredito: CartaoCredito) {
	    this.confirmation.confirm({
	      message: 'Confirma a exclusão do registro?',
	      accept: () => {
	        this.cartaoCreditoService.delete(cartaoCredito.id)
	        .then(() => {
	          this.messageHandler.showSuccess('Registro excluído!');
	          this.cartaoCreditoList(0);
	        })
	        .catch((e) => {
	          this.messageHandler.showError('Erro ao excluir registro: ' + e);
	        });
	      }
	    });
	}
	
	cartaoCreditoListOnLazyLoad(event: LazyLoadEvent) {
	    if (event.sortField) {
	      this.cartaoCreditoListFilter.sortField = new SortField(event.sortField, event.sortOrder);
	    } else {
	      this.cartaoCreditoListFilter.sortField = new SortField('banco', 1); // asc
	    }
	    const pageNumber = event.first / event.rows;
	    this.cartaoCreditoList(pageNumber);
	}
	
	
	cartaoCreditoBancoAutoCompleteFieldConverter(banco: BancoAutoComplete) {
		if (banco) {
			return banco.numero + ' - ' + banco.nome;
		} else {
			return null;
		}
	}
	
	cartaoCreditoBandeiraCartaoAutoCompleteFieldConverter(bandeiraCartao: BandeiraCartaoAutoComplete) {
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
