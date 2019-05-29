/**********************************************************************************************
Code generated with MKL Plug-in version: 3.0.2
Code generated at time stamp: 2019-05-28T21:35:52.612
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { PlanoConta } from './planoconta.model';
import { PlanoContaService } from './planoconta.service';
import { FinanceiroContasPagarTranslationService } from './../i18n/financeiro-contaspagar-translation.service';

import { PlanoContaAutoComplete } from './../planoconta/planoconta.model';

import { TipoReceitaDespesa } from './../enums/financeiro-contaspagar-enums.model';

@Component({
  selector: 'app-crud-planoconta.component',
  templateUrl: './crud-planoconta.component.html',
  styleUrls: ['./crud-planoconta.component.css']
})

export class PlanoContaComponent implements OnInit {
	planoConta = new PlanoConta();
	planoContaPlanoContaPaiAutoCompleteSuggestions: PlanoContaAutoComplete[];
	planoContaTipoReceitaDespesaOptions: TipoReceitaDespesa[];
	
	constructor(
	    private planoContaService: PlanoContaService,
	    private financeiroContasPagarTranslationService: FinanceiroContasPagarTranslationService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) { 
		this.initializePlanoContaTipoReceitaDespesaOptions();
	}
	
	ngOnInit() {
		this.initializeEnumFieldsWithDefault();
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getPlanoContaById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.planoConta = new PlanoConta();
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
	    this.planoContaService.create(this.planoConta)
	    .then((planoConta) => {
	      this.planoConta = planoConta;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}
	
	update(form: FormControl) {
	    this.planoContaService.update(this.planoConta)
	    .then((planoConta) => {
	      this.planoConta = planoConta;
	      this.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.showError('Erro ao atualizar registro: ' + error);
	    });
	}
	
	getPlanoContaById(id: string) {
	    this.planoContaService.retrieve(id)
	    .then((planoConta) => this.planoConta = planoConta)
	    .catch(error => {
	      this.showError('Erro ao buscar registro: ' + id);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.planoConta.id);
	}
	
	initializeEnumFieldsWithDefault() {
		this.planoConta.tipoReceitaDespesa = this.planoContaTipoReceitaDespesaOptions[0].value;
	}
	
	
	planoContaPlanoContaPaiAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.planoConta.planoContaPai = null;
	}
	
	planoContaPlanoContaPaiAutoComplete(event) {
	    const query = event.query;
	    this.planoContaService
	      .autoComplete(query)
	      .then((result) => {
	        this.planoContaPlanoContaPaiAutoCompleteSuggestions = result as PlanoContaAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}
	
	planoContaPlanoContaPaiAutoCompleteFieldConverter(planoContaPai: PlanoContaAutoComplete) {
		if (planoContaPai) {
			return planoContaPai.codigo + ' - ' + planoContaPai.descricao;
		} else {
			return null;
		}
	}
	
	private initializePlanoContaTipoReceitaDespesaOptions() {
	    this.planoContaTipoReceitaDespesaOptions = [
	    	{ label: this.getTranslation('financeiro.contas_pagar.planoConta_tipoReceitaDespesa_variavel'), value: 'VARIAVEL' }, 
	    	{ label: this.getTranslation('financeiro.contas_pagar.planoConta_tipoReceitaDespesa_fixo'), value: 'FIXO' }
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
