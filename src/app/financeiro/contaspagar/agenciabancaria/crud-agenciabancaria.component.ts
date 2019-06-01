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

import { AgenciaBancaria } from './agenciabancaria.model';
import { AgenciaBancariaService } from './agenciabancaria.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';

import { BancoService } from './../banco/banco.service';
import { Banco } from './../banco/banco.model';
import { BancoAutoComplete } from './../banco/banco.model';

@Component({
  selector: 'app-crud-agenciabancaria.component',
  templateUrl: './crud-agenciabancaria.component.html',
  styleUrls: ['./crud-agenciabancaria.component.css']
})

export class AgenciaBancariaComponent implements OnInit {
	agenciaBancaria = new AgenciaBancaria();
	agenciaBancariaBancoAutoCompleteSuggestions: BancoAutoComplete[];
	
	constructor(
	    private agenciaBancariaService: AgenciaBancariaService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private bancoService: BancoService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) { 
	}
	
	ngOnInit() {
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getAgenciaBancariaById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.agenciaBancaria = new AgenciaBancaria();
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
	    this.agenciaBancariaService.create(this.agenciaBancaria)
	    .then((agenciaBancaria) => {
	      this.agenciaBancaria = agenciaBancaria;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}
	
	update() {
	    this.agenciaBancariaService.update(this.agenciaBancaria)
	    .then((agenciaBancaria) => {
	      this.agenciaBancaria = agenciaBancaria;
	      this.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.showError('Erro ao atualizar registro: ' + error);
	    });
	}
	
	getAgenciaBancariaById(id: string) {
	    this.agenciaBancariaService.retrieve(id)
	    .then((agenciaBancaria) => this.agenciaBancaria = agenciaBancaria)
	    .catch(error => {
	      this.showError('Erro ao buscar registro: ' + id);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.agenciaBancaria.id);
	}
	
	
	
	agenciaBancariaBancoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.agenciaBancaria.banco = null;
	}
	
	agenciaBancariaBancoAutoComplete(event) {
	    const query = event.query;
	    this.bancoService
	      .autoComplete(query)
	      .then((result) => {
	        this.agenciaBancariaBancoAutoCompleteSuggestions = result as BancoAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}
	
	agenciaBancariaBancoAutoCompleteFieldConverter(banco: BancoAutoComplete) {
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
		const value = this.financeiroContasPagarTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
}
