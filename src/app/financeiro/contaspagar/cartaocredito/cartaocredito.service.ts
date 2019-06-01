/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.1
Code generated at time stamp: 2019-06-01T10:39:06.126
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../security/http-client-token';

import { CartaoCredito } from './cartaocredito.model';
import { CartaoCreditoAutoComplete } from './cartaocredito.model';
import { Banco } from './../banco/banco.model';
import { BandeiraCartao } from './../bandeiracartao/bandeiracartao.model';
import { CartaoCreditoListFilter } from './cartaocredito.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class CartaoCreditoService {
	
	// TODO: Provisório
	// url = 'http://localhost:9101/entities/cartaoCredito';
	url = environment.apiUrl + '/financeiro/contas_pagar/entities/cartaoCredito';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(cartaoCredito: CartaoCredito): Promise<CartaoCredito> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, cartaoCredito, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as CartaoCredito;
	      this.adjustNullEntitySlots([created]);
	      this.adjustEntityDates([created]);
	      return created;
	    });
	}
	
	update(cartaoCredito: CartaoCredito): Promise<CartaoCredito> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${cartaoCredito.id}`, cartaoCredito, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as CartaoCredito;
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
	
	retrieve(id: string): Promise<CartaoCredito> {
	    const headers = this.getHeaders();
	    return this.http.get<CartaoCredito>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const cartaoCredito = response as CartaoCredito;
	      this.adjustNullEntitySlots([cartaoCredito]);
	      this.adjustEntityDates([cartaoCredito]);
	      return cartaoCredito;
	    });
	}
	
	
	private adjustEntityDates(entityList: CartaoCredito[]) {
		entityList.forEach(cartaoCredito => {
		      if (cartaoCredito.validade) {
		        cartaoCredito.validade = moment(cartaoCredito.validade, 'YYYY-MM-DD').toDate();
		      }
		      	
		});
	}
	
	private adjustNullEntitySlots(entityList: CartaoCredito[]) {
		/*entityList.forEach(cartaoCredito => {
		      if (!cartaoCredito.banco) {
		        cartaoCredito.banco = new Banco();
		      }
		      	
		      
		      if (!cartaoCredito.bandeiraCartao) {
		        cartaoCredito.bandeiraCartao = new BandeiraCartao();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<CartaoCreditoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<CartaoCreditoAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as CartaoCreditoAutoComplete[];
	        return result;
	      });
	
	}
	
	
	cartaoCreditoList(cartaoCreditoListFilter: CartaoCreditoListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(cartaoCreditoListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of CartaoCredito */
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
	
	
	mountAndGetSearchParams(filter: CartaoCreditoListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
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
	replicateCartaoCredito(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateCartaoCreditoPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateCartaoCredito`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterCartaoCredito(filter: CartaoCreditorListFilter): Promise<TotaisfilterCartaoCredito> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterCartaoCredito>(`${this.url}/getTotaisfilterCartaoCredito`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterCartaoCredito;
	      return result;
	    });
	}
	*/
}

