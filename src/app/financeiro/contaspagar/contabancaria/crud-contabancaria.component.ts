/**********************************************************************************************
Code generated with MKL Plug-in version: 3.4.1
Code generated at time stamp: 2019-05-30T20:20:55.617
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ContaBancaria } from './contabancaria.model';
import { ContaBancariaService } from './contabancaria.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';

import { AgenciaBancariaService } from './../agenciabancaria/agenciabancaria.service';
import { AgenciaBancaria } from './../agenciabancaria/agenciabancaria.model';
import { AgenciaBancariaAutoComplete } from './../agenciabancaria/agenciabancaria.model';

import { TipoContaBancaria } from './../enums/financeiro-contaspagar-enums.model';

@Component({
  selector: 'app-crud-contabancaria.component',
  templateUrl: './crud-contabancaria.component.html',
  styleUrls: ['./crud-contabancaria.component.css']
})

export class ContaBancariaComponent implements OnInit {
	contaBancaria = new ContaBancaria();
	contaBancariaAgenciaAutoCompleteSuggestions: AgenciaBancariaAutoComplete[];
	contaBancariaTipoContaBancariaOptions: TipoContaBancaria[];
	
	constructor(
	    private contaBancariaService: ContaBancariaService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private agenciaBancariaService: AgenciaBancariaService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) { 
		this.initializeContaBancariaTipoContaBancariaOptions();
	}
	
	ngOnInit() {
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getContaBancariaById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.contaBancaria = new ContaBancaria();
	      this.initializeEnumFieldsWithDefault();
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
	    this.contaBancariaService.create(this.contaBancaria)
	    .then((contaBancaria) => {
	      this.contaBancaria = contaBancaria;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}
	
	update(form: FormControl) {
	    this.contaBancariaService.update(this.contaBancaria)
	    .then((contaBancaria) => {
	      this.contaBancaria = contaBancaria;
	      this.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.showError('Erro ao atualizar registro: ' + error);
	    });
	}
	
	getContaBancariaById(id: string) {
	    this.contaBancariaService.retrieve(id)
	    .then((contaBancaria) => this.contaBancaria = contaBancaria)
	    .catch(error => {
	      this.showError('Erro ao buscar registro: ' + id);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.contaBancaria.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.contaBancaria.tipoContaBancaria = this.contaBancariaTipoContaBancariaOptions[0].value;
	}
	
	
	contaBancariaAgenciaAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaBancaria.agencia = null;
	}
	
	contaBancariaAgenciaAutoComplete(event) {
	    const query = event.query;
	    this.agenciaBancariaService
	      .autoComplete(query)
	      .then((result) => {
	        this.contaBancariaAgenciaAutoCompleteSuggestions = result as AgenciaBancariaAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}
	
	contaBancariaAgenciaAutoCompleteFieldConverter(agencia: AgenciaBancariaAutoComplete) {
		if (agencia) {
			return agencia.numeroAgencia + ' - ' + agencia.digitoAgencia + ' - ' + agencia.endereco;
		} else {
			return null;
		}
	}
	
	private initializeContaBancariaTipoContaBancariaOptions() {
	    this.contaBancariaTipoContaBancariaOptions = [
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaBancaria_tipoContaBancaria_conta_corrente'), value: 'CONTA_CORRENTE' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaBancaria_tipoContaBancaria_conta_poupanca'), value: 'CONTA_POUPANCA' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaBancaria_tipoContaBancaria_conta_salario'), value: 'CONTA_SALARIO' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.contaBancaria_tipoContaBancaria_conta_investimento'), value: 'CONTA_INVESTIMENTO' }
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
	
}
