
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { CartaoCredito } from './cartaocredito.model';
import { CartaoCreditoService } from './cartaocredito.service';
import { KerubinClientesTranslationService } from './../i18n/kerubin-clientes-translation.service';

import { BandeiraCartaoService } from './../bandeiracartao/bandeiracartao.service';
import { BandeiraCartao } from './../bandeiracartao/bandeiracartao.model';
import { BandeiraCartaoAutoComplete } from './../bandeiracartao/bandeiracartao.model';

import { BancoService } from './../banco/banco.service';
import { Banco } from './../banco/banco.model';
import { BancoAutoComplete } from './../banco/banco.model';

@Component({
  selector: 'app-crud-cartaocredito.component',
  templateUrl: './crud-cartaocredito.component.html',
  styleUrls: ['./crud-cartaocredito.component.css']
})

export class CartaoCreditoComponent implements OnInit {
	cartaoCredito = new CartaoCredito();
	cartaoCreditoBandeiraCartaoAutoCompleteSuggestions: BandeiraCartaoAutoComplete[];
	
	
	cartaoCreditoBancoAutoCompleteSuggestions: BancoAutoComplete[];
	
	constructor(
	    private cartaoCreditoService: CartaoCreditoService,
	    private kerubinClientesTranslationService: KerubinClientesTranslationService,
	    private bandeiraCartaoService: BandeiraCartaoService,
	    
	    
	    private bancoService: BancoService,
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
	
	save(form: FormControl) {
	    if (this.isEditing) {
	      this.update(form);
	    } else {
	      this.create(form);
	    }
	}
	
	create(form: FormControl) {
	    this.cartaoCreditoService.create(this.cartaoCredito)
	    .then((cartaoCredito) => {
	      this.cartaoCredito = cartaoCredito;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}
	
	update(form: FormControl) {
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
			return bandeiraCartao.nome;
		} else {
			return null;
		}
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
	
}
