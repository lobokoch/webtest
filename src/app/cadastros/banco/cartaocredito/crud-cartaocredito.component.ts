/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.1
Code generated at time stamp: 2019-06-01T10:39:13.215
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { CartaoCredito } from './cartaocredito.model';
import { CartaoCreditoService } from './cartaocredito.service';
import { CadastrosBancoTranslationService } from './../i18n/cadastros-banco-translation.service';

import { BancoService } from './../banco/banco.service';
import { Banco } from './../banco/banco.model';
import { BancoAutoComplete } from './../banco/banco.model';

import { BandeiraCartaoService } from './../bandeiracartao/bandeiracartao.service';
import { BandeiraCartao } from './../bandeiracartao/bandeiracartao.model';
import { BandeiraCartaoAutoComplete } from './../bandeiracartao/bandeiracartao.model';

@Component({
  selector: 'app-crud-cartaocredito.component',
  templateUrl: './crud-cartaocredito.component.html',
  styleUrls: ['./crud-cartaocredito.component.css']
})

export class CartaoCreditoComponent implements OnInit {
	cartaoCredito = new CartaoCredito();
	cartaoCreditoBancoAutoCompleteSuggestions: BancoAutoComplete[];
	
	
	cartaoCreditoBandeiraCartaoAutoCompleteSuggestions: BandeiraCartaoAutoComplete[];
	
	constructor(
	    private cartaoCreditoService: CartaoCreditoService,
	    private cadastrosBancoTranslationService: CadastrosBancoTranslationService,
	    private bancoService: BancoService,
	    
	    
	    private bandeiraCartaoService: BandeiraCartaoService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) { 
	}
	
	ngOnInit() {
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getCartaoCreditoById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.cartaoCredito = new CartaoCredito();
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
	}
	
	create() {
	    this.cartaoCreditoService.create(this.cartaoCredito)
	    .then((cartaoCredito) => {
	      this.cartaoCredito = cartaoCredito;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}
	
	update() {
	    this.cartaoCreditoService.update(this.cartaoCredito)
	    .then((cartaoCredito) => {
	      this.cartaoCredito = cartaoCredito;
	      this.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.showError('Erro ao atualizar registro: ' + error);
	    });
	}
	
	getCartaoCreditoById(id: string) {
	    this.cartaoCreditoService.retrieve(id)
	    .then((cartaoCredito) => this.cartaoCredito = cartaoCredito)
	    .catch(error => {
	      this.showError('Erro ao buscar registro: ' + id);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.cartaoCredito.id);
	}
	
	
	
	cartaoCreditoBancoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.cartaoCredito.banco = null;
	}
	
	cartaoCreditoBancoAutoComplete(event) {
	    const query = event.query;
	    this.bancoService
	      .autoComplete(query)
	      .then((result) => {
	        this.cartaoCreditoBancoAutoCompleteSuggestions = result as BancoAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}
	
	cartaoCreditoBancoAutoCompleteFieldConverter(banco: BancoAutoComplete) {
		if (banco) {
			return banco.numero + ' - ' + banco.nome;
		} else {
			return null;
		}
	}
	
	
	cartaoCreditoBandeiraCartaoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.cartaoCredito.bandeiraCartao = null;
	}
	
	cartaoCreditoBandeiraCartaoAutoComplete(event) {
	    const query = event.query;
	    this.bandeiraCartaoService
	      .autoComplete(query)
	      .then((result) => {
	        this.cartaoCreditoBandeiraCartaoAutoCompleteSuggestions = result as BandeiraCartaoAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}
	
	cartaoCreditoBandeiraCartaoAutoCompleteFieldConverter(bandeiraCartao: BandeiraCartaoAutoComplete) {
		if (bandeiraCartao) {
			return bandeiraCartao.nomeBandeira;
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
		const value = this.cadastrosBancoTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
}
