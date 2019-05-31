/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.0
Code generated at time stamp: 2019-05-31T07:35:02.901
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { Fornecedor } from './fornecedor.model';
import { FornecedorService } from './fornecedor.service';
import { CadastrosFornecedorTranslationService } from './../i18n/cadastros-fornecedor-translation.service';

@Component({
  selector: 'app-crud-fornecedor.component',
  templateUrl: './crud-fornecedor.component.html',
  styleUrls: ['./crud-fornecedor.component.css']
})

export class FornecedorComponent implements OnInit {
	fornecedor = new Fornecedor();
	
	constructor(
	    private fornecedorService: FornecedorService,
	    private cadastrosFornecedorTranslationService: CadastrosFornecedorTranslationService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) { 
	}
	
	ngOnInit() {
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getFornecedorById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.fornecedor = new Fornecedor();
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
	
	save(form: FormControl) {
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
	    this.fornecedorService.create(this.fornecedor)
	    .then((fornecedor) => {
	      this.fornecedor = fornecedor;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}
	
	update() {
	    this.fornecedorService.update(this.fornecedor)
	    .then((fornecedor) => {
	      this.fornecedor = fornecedor;
	      this.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.showError('Erro ao atualizar registro: ' + error);
	    });
	}
	
	getFornecedorById(id: string) {
	    this.fornecedorService.retrieve(id)
	    .then((fornecedor) => this.fornecedor = fornecedor)
	    .catch(error => {
	      this.showError('Erro ao buscar registro: ' + id);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.fornecedor.id);
	}
	
	
	
	
	
	public showSuccess(msg: string) {
	    this.messageService.add({severity: 'success', summary: 'Successo', detail: msg});
	}
	
	public showError(msg: string) {
	    this.messageService.add({severity: 'error', summary: 'Erro', detail: msg});
	}
	
	// TODO: temporário, só para testes.
	getTranslation(key: string): string {
		const value = this.cadastrosFornecedorTranslationService.getTranslation(key);
		return value;
		
		// const result = key.substring(key.lastIndexOf('_') + 1);
		// return result;
	}
	
}
