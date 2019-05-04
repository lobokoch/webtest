
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MessageService} from 'primeng/api';

import { BandeiraCartao } from './bandeiracartao.model';
import { BandeiraCartaoService } from './bandeiracartao.service';
import { KerubinClientesTranslationService } from './../i18n/kerubin-clientes-translation.service';

@Component({
  selector: 'app-crud-bandeiracartao.component',
  templateUrl: './crud-bandeiracartao.component.html',
  styleUrls: ['./crud-bandeiracartao.component.css']
})

export class BandeiraCartaoComponent implements OnInit {
	bandeiraCartao = new BandeiraCartao();
	
	constructor(
	    private bandeiraCartaoService: BandeiraCartaoService,
	    private kerubinClientesTranslationService: KerubinClientesTranslationService,
	    private route: ActivatedRoute,
	    private messageService: MessageService
	) { 
	}
	
	ngOnInit() {
	    const id = this.route.snapshot.params['id'];
	    if (id) {
	      this.getBandeiraCartaoById(id);
	    }
	}
	
	begin(form: FormControl) {
	    form.reset();
	    setTimeout(function() {
	      this.bandeiraCartao = new BandeiraCartao();
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
	    this.bandeiraCartaoService.create(this.bandeiraCartao)
	    .then((bandeiraCartao) => {
	      this.bandeiraCartao = bandeiraCartao;
	      this.showSuccess('Registro criado com sucesso!');
	    }).
	    catch(error => {
	      this.showError('Erro ao criar registro: ' + error);
	    });
	}
	
	update(form: FormControl) {
	    this.bandeiraCartaoService.update(this.bandeiraCartao)
	    .then((bandeiraCartao) => {
	      this.bandeiraCartao = bandeiraCartao;
	      this.showSuccess('Registro alterado!');
	    })
	    .catch(error => {
	      this.showError('Erro ao atualizar registro: ' + error);
	    });
	}
	
	getBandeiraCartaoById(id: string) {
	    this.bandeiraCartaoService.retrieve(id)
	    .then((bandeiraCartao) => this.bandeiraCartao = bandeiraCartao)
	    .catch(error => {
	      this.showError('Erro ao buscar registro: ' + id);
	    });
	}
	
	get isEditing() {
	    return Boolean(this.bandeiraCartao.id);
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
