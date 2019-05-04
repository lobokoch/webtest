
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ContaPagar } from './contapagar.model';
import { ContaPagarService } from './contapagar.service';
import { KerubinClientesTranslationService } from './../i18n/kerubin-clientes-translation.service';

import { ContaBancariaService } from './../contabancaria/contabancaria.service';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { ContaBancariaAutoComplete } from './../contabancaria/contabancaria.model';

import { CartaoCreditoService } from './../cartaocredito/cartaocredito.service';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { CartaoCreditoAutoComplete } from './../cartaocredito/cartaocredito.model';

import { FornecedorService } from './../fornecedor/fornecedor.service';
import { Fornecedor } from './../fornecedor/fornecedor.model';
import { FornecedorAutoComplete } from './../fornecedor/fornecedor.model';
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
	contaPagarContaBancariaAutoCompleteSuggestions: ContaBancariaAutoComplete[];
	
	
	contaPagarCartaoCreditoAutoCompleteSuggestions: CartaoCreditoAutoComplete[];
	
	
	contaPagarFornecedorAutoCompleteSuggestions: FornecedorAutoComplete[];
	
	constructor(
	    private contaPagarService: ContaPagarService,
	    private kerubinClientesTranslationService: KerubinClientesTranslationService,
	    private contaBancariaService: ContaBancariaService,
	    
	    
	    private cartaoCreditoService: CartaoCreditoService,
	    
	    
	    private fornecedorService: FornecedorService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) { 
		this.initializeCopiesReferenceFieldOptions();
	}
	
	ngOnInit() {
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getContaPagarById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.contaPagar = new ContaPagar();
	    }.bind(this), 1);
	}
	
	save(form: FormControl) {
	    if (this.isEditing) {
	      this.update(form);
	    } else {
	      this.create(form);
	    }
		this.initializeCopiesReferenceFieldOptions();
	}
	
	create(form: FormControl) {
	    this.contaPagarService.create(this.contaPagar)
	    .then((contaPagar) => {
	      this.contaPagar = contaPagar;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}
	
	update(form: FormControl) {
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
			return contaBancaria.titular + ' - ' + contaBancaria.numeroConta + ' - ' + contaBancaria.digito;
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
			return cartaoCredito.titular + ' - ' + cartaoCredito.numeroCartao;
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
	
	
	public showSuccess(msg: string) {
	    this.messageService.add({severity: 'success', summary: 'Successo', detail: msg});
	}
	
	public showError(msg: string) {
	    this.messageService.add({severity: 'error', summary: 'Erro', detail: msg});
	}
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.kerubinClientesTranslationService.getTranslation(key);
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
