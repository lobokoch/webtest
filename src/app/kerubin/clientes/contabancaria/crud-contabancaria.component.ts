
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ContaBancaria } from './contabancaria.model';
import { ContaBancariaService } from './contabancaria.service';
import { KerubinClientesTranslationService } from './../i18n/kerubin-clientes-translation.service';

import { AgenciaBancariaService } from './../agenciabancaria/agenciabancaria.service';
import { AgenciaBancaria } from './../agenciabancaria/agenciabancaria.model';
import { AgenciaBancariaAutoComplete } from './../agenciabancaria/agenciabancaria.model';

import { BandeiraCartaoService } from './../bandeiracartao/bandeiracartao.service';
import { BandeiraCartao } from './../bandeiracartao/bandeiracartao.model';
import { BandeiraCartaoAutoComplete } from './../bandeiracartao/bandeiracartao.model';

import { TipoContaBancaria } from './../enums/kerubin-clientes-enums.model';

@Component({
  selector: 'app-crud-contabancaria.component',
  templateUrl: './crud-contabancaria.component.html',
  styleUrls: ['./crud-contabancaria.component.css']
})

export class ContaBancariaComponent implements OnInit {
	contaBancaria = new ContaBancaria();
	contaBancariaAgenciaAutoCompleteSuggestions: AgenciaBancariaAutoComplete[];
	
	
	contaBancariaBandeiraCartaoAutoCompleteSuggestions: BandeiraCartaoAutoComplete[];
	contaBancariaTipoContaBancariaOptions: TipoContaBancaria[];
	
	constructor(
	    private contaBancariaService: ContaBancariaService,
	    private kerubinClientesTranslationService: KerubinClientesTranslationService,
	    private agenciaBancariaService: AgenciaBancariaService,
	    
	    
	    private bandeiraCartaoService: BandeiraCartaoService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) { 
		this.initializeContaBancariaTipoContaBancariaOptions();
	}
	
	ngOnInit() {
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getContaBancariaById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.contaBancaria = new ContaBancaria();
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
			return agencia.numero + ' - ' + agencia.digito + ' - ' + agencia.endereco;
		} else {
			return null;
		}
	}
	
	
	contaBancariaBandeiraCartaoAutoCompleteClear(event) {
		// The autoComplete value has been reseted
		this.contaBancaria.bandeiraCartao = null;
	}
	
	contaBancariaBandeiraCartaoAutoComplete(event) {
	    const query = event.query;
	    this.bandeiraCartaoService
	      .autoComplete(query)
	      .then((result) => {
	        this.contaBancariaBandeiraCartaoAutoCompleteSuggestions = result as BandeiraCartaoAutoComplete[];
	      })
	      .catch(error => {
	        this.showError('Erro ao buscar registros com o termo: ' + query);
	      });
	}
	
	contaBancariaBandeiraCartaoAutoCompleteFieldConverter(bandeiraCartao: BandeiraCartaoAutoComplete) {
		if (bandeiraCartao) {
			return bandeiraCartao.nome;
		} else {
			return null;
		}
	}
	
	private initializeContaBancariaTipoContaBancariaOptions() {
	    this.contaBancariaTipoContaBancariaOptions = [
	    	{ label: this.getTranslation('kerubin.clientes.contaBancaria_tipoContaBancaria_conta_corrente'), value: 'CONTA_CORRENTE' }, 
	    	{ label: this.getTranslation('kerubin.clientes.contaBancaria_tipoContaBancaria_conta_poupanca'), value: 'CONTA_POUPANCA' }, 
	    	{ label: this.getTranslation('kerubin.clientes.contaBancaria_tipoContaBancaria_conta_investimento'), value: 'CONTA_INVESTIMENTO' }
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
		const value = this.kerubinClientesTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
}
