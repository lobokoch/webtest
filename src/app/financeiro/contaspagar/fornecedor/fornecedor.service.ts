/**********************************************************************************************
Code generated with MKL Plug-in version: 3.4.1
Code generated at time stamp: 2019-05-30T20:20:55.617
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../security/http-client-token';

import { Fornecedor } from './fornecedor.model';
import { FornecedorAutoComplete } from './fornecedor.model';
import { FornecedorListFilter } from './fornecedor.model';
import { FornecedorNomeAutoComplete } from './fornecedor.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class FornecedorService {
	
	// TODO: Provisório
	// url = 'http://localhost:9101/entities/fornecedor';
	url = environment.apiUrl + '/financeiro/contas_pagar/entities/fornecedor';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(fornecedor: Fornecedor): Promise<Fornecedor> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, fornecedor, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as Fornecedor;
	      return created;
	    });
	}
	
	update(fornecedor: Fornecedor): Promise<Fornecedor> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${fornecedor.id}`, fornecedor, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as Fornecedor;
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<Fornecedor> {
	    const headers = this.getHeaders();
	    return this.http.get<Fornecedor>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const fornecedor = response as Fornecedor;
	      return fornecedor;
	    });
	}
	
	
	
	
	autoComplete(query: string): Promise<FornecedorAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<FornecedorAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as FornecedorAutoComplete[];
	        return result;
	      });
	
	}
	
	
	fornecedorNomeAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<any>(`${this.url}/fornecedorNomeAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as FornecedorNomeAutoComplete[];
	        return result;
	      });
	
	}
	
	fornecedorList(fornecedorListFilter: FornecedorListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(fornecedorListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of Fornecedor */
	        const totalElements = data.totalElements;
	
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: FornecedorListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// nome
		if (filter.nome) {
			const nome = filter.nome.map(item => item.nome).join(',');
			params = params.set('nome', nome);
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
	replicateFornecedor(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateFornecedorPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateFornecedor`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterFornecedor(filter: FornecedorrListFilter): Promise<TotaisfilterFornecedor> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterFornecedor>(`${this.url}/getTotaisfilterFornecedor`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterFornecedor;
	      return result;
	    });
	}
	*/
}

