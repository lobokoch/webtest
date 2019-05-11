
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../security/http-client-token';

import { ContaPagar } from './contapagar.model';
import { ContaPagarAutoComplete } from './contapagar.model';
import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { Fornecedor } from './../fornecedor/fornecedor.model';
import { ContaPagarListFilter } from './contapagar.model';
import { ContaPagarDescricaoAutoComplete } from './contapagar.model';
import { ContaPagarAgrupadorAutoComplete } from './contapagar.model';
import { ContaPagarSumFields } from './contapagar.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContaPagarService {
	
	// TODO: Provisório
	// url = 'http://localhost:9101/entities/contaPagar';
	url = environment.apiUrl + '/kerubin/clientes/entities/contaPagar';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(contaPagar: ContaPagar): Promise<ContaPagar> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, contaPagar, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as ContaPagar;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(contaPagar: ContaPagar): Promise<ContaPagar> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${contaPagar.id}`, contaPagar, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as ContaPagar;
	      this.adjustNullEntitySlots([updated]);
	      this.adjustEntityDates([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<ContaPagar> {
	    const headers = this.getHeaders();
	    return this.http.get<ContaPagar>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const contaPagar = response as ContaPagar;
	      this.adjustNullEntitySlots([contaPagar]);
	      this.adjustEntityDates([contaPagar]);
	      return contaPagar;
	    });
	}
	
	 
	actionBaixarContaComUmClique(id: string): Promise<void> {
		const headers = this.getHeaders();
		
		return this.http.put(`${this.url}/actionBaixarContaComUmClique/${id}`, { headers })
		.toPromise()
		.then(() => null);
	}
	 
	actionEstornarPagamentoContaComUmClique(id: string): Promise<void> {
		const headers = this.getHeaders();
		
		return this.http.put(`${this.url}/actionEstornarPagamentoContaComUmClique/${id}`, { headers })
		.toPromise()
		.then(() => null);
	}
	 
	actionFazerCopiasContaPagar(id: string, numberOfCopies: Number, referenceFieldInterval: Number, agrupador: String): Promise<void> {
	    const headers = this.getHeaders();
	      const entityCopy = { id, numberOfCopies, referenceFieldInterval, agrupador };
		    return this.http.post(`${this.url}/actionFazerCopiasContaPagar`, entityCopy, { headers })
		    .toPromise()
		    .then( () => null);
	}
	
	private adjustEntityDates(entityList: ContaPagar[]) {
		entityList.forEach(contaPagar => {
		      if (contaPagar.dataVencimento) {
		        contaPagar.dataVencimento = moment(contaPagar.dataVencimento, 'YYYY-MM-DD').toDate();
		      }
		      	
		      
		      if (contaPagar.dataPagamento) {
		        contaPagar.dataPagamento = moment(contaPagar.dataPagamento, 'YYYY-MM-DD').toDate();
		      }
		      	
		});
	}
	
	private adjustNullEntitySlots(entityList: ContaPagar[]) {
		/*entityList.forEach(contaPagar => {
		      if (!contaPagar.contaBancaria) {
		        contaPagar.contaBancaria = new ContaBancaria();
		      }
		      	
		      
		      if (!contaPagar.cartaoCredito) {
		        contaPagar.cartaoCredito = new CartaoCredito();
		      }
		      	
		      
		      if (!contaPagar.fornecedor) {
		        contaPagar.fornecedor = new Fornecedor();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<ContaPagarAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<ContaPagarAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ContaPagarAutoComplete[];
	        return result;
	      });
	
	}
	
	
	contaPagarDescricaoAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<any>(`${this.url}/contaPagarDescricaoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ContaPagarDescricaoAutoComplete[];
	        return result;
	      });
	
	}
	
	contaPagarAgrupadorAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<any>(`${this.url}/contaPagarAgrupadorAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as ContaPagarAgrupadorAutoComplete[];
	        return result;
	      });
	
	}
	
	contaPagarList(contaPagarListFilter: ContaPagarListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(contaPagarListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of ContaPagar */
	        const totalElements = data.totalElements;
	
	        this.adjustNullEntitySlots(items);
	        this.adjustEntityDates(items);
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	getContaPagarSumFields(contaPagarListFilter: ContaPagarListFilter): Promise<ContaPagarSumFields> {
	    const headers = this.getHeaders();
	    
		const params = this.mountAndGetSearchParams(contaPagarListFilter);
		return this.http.get<any>(`${this.url}/contaPagarSumFields`, { headers, params })
		  .toPromise()
		  .then(response => {
		    const result = response;
		    return result;
		  });
	}
	
	mountAndGetSearchParams(filter: ContaPagarListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// descricao
		if (filter.descricao) {
			const descricao = filter.descricao.map(item => item.descricao).join(',');
			params = params.set('descricao', descricao);
		}
		
		// dataVencimentoFrom
		if (filter.dataVencimentoFrom) {
		const value = this.dateToStr(filter.dataVencimentoFrom);
			params = params.set('dataVencimentoFrom', value);
		}
		
		// dataVencimentoTo
		if (filter.dataVencimentoTo) {
		const value = this.dateToStr(filter.dataVencimentoTo);
			params = params.set('dataVencimentoTo', value);
		}
		
		// dataPagamentoIsNotNull
		if (filter.dataPagamentoIsNotNull) {
			const value = filter.dataPagamentoIsNotNull ? 'true' : 'false';
			params = params.set('dataPagamentoIsNotNull', value);
		}
		
		// dataPagamentoIsNull
		if (filter.dataPagamentoIsNull) {
			const value = filter.dataPagamentoIsNull ? 'true' : 'false';
			params = params.set('dataPagamentoIsNull', value);
		}
		
		// agrupador
		if (filter.agrupador) {
			const agrupador = filter.agrupador.map(item => item.agrupador).join(',');
			params = params.set('agrupador', agrupador);
		}
	
	    // Sort
	    if (filter.sortField) {
	      // search/nameStartsWith?name=K&sort=name,desc
	      const sortField = filter.sortField;
	      const sortValue = `${sortField.field},${sortField.order > 0 ? 'asc' : 'desc'}`;
	      params = params.set('sort', sortValue);
	    }
	
	    return params;
	  }
	
	dateToStr(data: Date): string {
	    return moment(data).format('YYYY-MM-DD');
	}
	
	/*** TODO: avaliar se vai ser feito isso.
	replicateContaPagar(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateContaPagarPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateContaPagar`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterContaPagar(filter: ContaPagarrListFilter): Promise<TotaisfilterContaPagar> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterContaPagar>(`${this.url}/getTotaisfilterContaPagar`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterContaPagar;
	      return result;
	    });
	}
	*/
}

