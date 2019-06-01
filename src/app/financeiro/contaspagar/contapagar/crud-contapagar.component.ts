/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.1
Code generated at time stamp: 2019-06-01T10:39:06.126
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ContaPagar } from './contapagar.model';
import { ContaPagarService } from './contapagar.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';

import { PlanoContaService } from './../planoconta/planoconta.service';
import { PlanoConta } from './../planoconta/planoconta.model';
import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { ContaBancariaService } from './../contabancaria/contabancaria.service';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { ContaBancariaAutoComplete } from './../contabancaria/contabancaria.model';

import { CartaoCreditoService } from './../cartaocredito/cartaocredito.service';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { CartaoCreditoAutoComplete } from './../cartaocredito/cartaocredito.model';

import { FornecedorService } from './../fornecedor/fornecedor.service';
import { Fornecedor } from './../fornecedor/fornecedor.model';
import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';

import { FormaPagamento } from './../enums/financeiro-contaspagar-enums.model';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-crud-contapagar.component',
  templateUrl: './crud-contapagar.component.html',
  styleUrls: ['./crud-contapagar.component.css']
})

export class ContaPagarComponent implements OnInit {
	 
	numberOfCopies = 1;
	copiesReferenceFieldInterval = 30;
	
	copiesReferenceFieldOptions: SelectItem[];
	copiesReferenceField: SelectItem = { label: 'Vencimento', value: 'dataVencimento' };
	copiesReferenceFieldSelected: SelectItem;
	 
	contaPagar = new ContaPagar();
	contaPagarPlanoContasAutoCompleteSuggestions: PlanoContaAutoComplete[];
	
	
	contaPagarContaBancariaAutoCompleteSuggestions: ContaBancariaAutoComplete[];
	
	
	contaPagarCartaoCreditoAutoCompleteSuggestions: CartaoCreditoAutoComplete[];
	
	
	contaPagarFornecedorAutoCompleteSuggestions: FornecedorAutoComplete[];
	contaPagarFormaPagamentoOptions: FormaPagamento[];
	
	constructor(
	    private contaPagarService: ContaPagarService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private planoContaService: PlanoContaService,
	    
	    
	    private contaBancariaService: ContaBancariaService,
	    
	    
	    private cartaoCreditoService: CartaoCreditoService,
	    
	    
	    private fornecedorService: FornecedorService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) { 
		this.initializeContaPagarFormaPagamentoOptions();
		this.initializeCopiesReferenceFieldOptions();
	}
	
	ngOnInit() {
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getContaPagarById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.contaPagar = new ContaPagar();
	      this.initializeEnumFieldsWithDefault();
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
	
	save(form: FormGroup) {
		if (!form.valid) {
	      this.validateAllFormFields(form);
	      return;
	    }
		    
	    if (this.isEditing) {
	      this.update();
	    } else {
	      this.create();
	    }
		this.initializeCopiesReferenceFieldOptions();
	}
	
	create() {
	    this.contaPagarService.create(this.contaPagar)
	    .then((contaPagar) => {
	      this.contaPagar = contaPagar;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}
	
	update() {
	    this.contaPagarService.update(this.contaPagar)
	    .then((contaPagar) => {
	      this.contaPagar = contaPagar;
	      this.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.showError('Erro ao atualizar registro: ' + error);
	    });
	}
	
	getContaPagarById(id: string) {
	    this.contaPagarService.retrieve(id)
	    .then((contaPagar) => this.contaPagar = contaPagar)
	    .catch(error => {
	      this.showError('Erro ao buscar registro: ' + id);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.contaPagar.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.contaPagar.formaPagamento = this.contaPagarFormaPagamentoOptions[0].value;
	}
	
	
	contaPagarPlanoContasAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagar.planoContas = null;
	}
	
	contaPagarPlanoContasAutoComplete(event) {
	    const query = event.query;
	    this.planoContaService
	      .autoComplete(query)
	      .then((result) => {
	        this.contaPagarPlanoContasAutoCompleteSuggestions = result as PlanoContaAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}
	
	contaPagarPlanoContasAutoCompleteFieldConverter(planoContas: PlanoContaAutoComplete) {
		if (planoContas) {
			return planoContas.codigo + ' - ' + planoContas.descricao;
		} else {
			return null;
		}
	}
	
	
	contaPagarContaBancariaAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagar.contaBancaria = null;
	}
	
	contaPagarContaBancariaAutoComplete(event) {
	    const query = event.query;
	    this.contaBancariaService
	      .autoComplete(query)
	      .then((result) => {
	        this.contaPagarContaBancariaAutoCompleteSuggestions = result as ContaBancariaAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}
	
	contaPagarContaBancariaAutoCompleteFieldConverter(contaBancaria: ContaBancariaAutoComplete) {
		if (contaBancaria) {
			return contaBancaria.nomeTitular + ' - ' + contaBancaria.numeroConta;
		} else {
			return null;
		}
	}
	
	
	contaPagarCartaoCreditoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagar.cartaoCredito = null;
	}
	
	contaPagarCartaoCreditoAutoComplete(event) {
	    const query = event.query;
	    this.cartaoCreditoService
	      .autoComplete(query)
	      .then((result) => {
	        this.contaPagarCartaoCreditoAutoCompleteSuggestions = result as CartaoCreditoAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}
	
	contaPagarCartaoCreditoAutoCompleteFieldConverter(cartaoCredito: CartaoCreditoAutoComplete) {
		if (cartaoCredito) {
			return cartaoCredito.nomeTitular + ' - ' + cartaoCredito.numeroCartao;
		} else {
			return null;
		}
	}
	
	
	contaPagarFornecedorAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaPagar.fornecedor = null;
	}
	
	contaPagarFornecedorAutoComplete(event) {
	    const query = event.query;
	    this.fornecedorService
	      .autoComplete(query)
	      .then((result) => {
	        this.contaPagarFornecedorAutoCompleteSuggestions = result as FornecedorAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}
	
	contaPagarFornecedorAutoCompleteFieldConverter(fornecedor: FornecedorAutoComplete) {
		if (fornecedor) {
			return fornecedor.nome;
		} else {
			return null;
		}
	}
	
	private initializeContaPagarFormaPagamentoOptions() {
	    this.contaPagarFormaPagamentoOptions = [
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagar_formaPagamento_dinheiro'), value: 'DINHEIRO' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagar_formaPagamento_conta_bancaria'), value: 'CONTA_BANCARIA' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagar_formaPagamento_cartao_credito'), value: 'CARTAO_CREDITO' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagar_formaPagamento_cheque'), value: 'CHEQUE' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaPagar_formaPagamento_outros'), value: 'OUTROS' }
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
		const value = this.financeiroContasPagarTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
	
	actionFazerCopiasContaPagar(form: FormControl) {
	      if (!this.contaPagar.agrupador) {
	        // this.copiesMustHaveGroup = true;
	        this.showError('Campo \'Agrupador\' deve ser informado para gerar cópias.');
	        return;
	      }
	      // this.copiesMustHaveGroup = false;
	
	      this.contaPagarService.actionFazerCopiasContaPagar(this.contaPagar.id, this.numberOfCopies,
	        this.copiesReferenceFieldInterval, this.contaPagar.agrupador)
		    .then(() => {
	        // this.copiesMustHaveGroup = false;
	        this.showSuccess('Operação realizada com sucesso!');
		    }).
		    catch(error => {
	        // this.copiesMustHaveGroup = false;
	        const message =  JSON.parse(error._body).message || 'Não foi possível realizar a operação';
	        console.log(error);
		      this.showError('Erro: ' + message);
		    });
	}
	 
	initializeCopiesReferenceFieldOptions() {
	    this.copiesReferenceFieldOptions = [
	      this.copiesReferenceField
	    ];
	
	    this.copiesReferenceFieldSelected = this.copiesReferenceField;
	    
	    this.numberOfCopies = 1;
	    this.copiesReferenceFieldInterval = 30;
	}
}
