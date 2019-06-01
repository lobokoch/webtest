/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.1
Code generated at time stamp: 2019-06-01T10:39:13.215
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../security/http-client-token';

import { AgenciaBancaria } from './agenciabancaria.model';
import { AgenciaBancariaAutoComplete } from './agenciabancaria.model';
import { Banco } from './../banco/banco.model';
import { AgenciaBancariaListFilter } from './agenciabancaria.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AgenciaBancariaService {
	
	// TODO: Provisório
	// url = 'http://localhost:9101/entities/agenciaBancaria';
	url = environment.apiUrl + '/cadastros/banco/entities/agenciaBancaria';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(agenciaBancaria: AgenciaBancaria): Promise<AgenciaBancaria> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, agenciaBancaria, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as AgenciaBancaria;
	      this.adjustNullEntitySlots([created]);
	      return created;
	    });
	}
	
	update(agenciaBancaria: AgenciaBancaria): Promise<AgenciaBancaria> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${agenciaBancaria.id}`, agenciaBancaria, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as AgenciaBancaria;
	      this.adjustNullEntitySlots([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<AgenciaBancaria> {
	    const headers = this.getHeaders();
	    return this.http.get<AgenciaBancaria>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const agenciaBancaria = response as AgenciaBancaria;
	      this.adjustNullEntitySlots([agenciaBancaria]);
	      return agenciaBancaria;
	    });
	}
	
	
	
	private adjustNullEntitySlots(entityList: AgenciaBancaria[]) {
		/*entityList.forEach(agenciaBancaria => {
		      if (!agenciaBancaria.banco) {
		        agenciaBancaria.banco = new Banco();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<AgenciaBancariaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<AgenciaBancariaAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as AgenciaBancariaAutoComplete[];
	        return result;
	      });
	
	}
	
	
	agenciaBancariaList(agenciaBancariaListFilter: AgenciaBancariaListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(agenciaBancariaListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of AgenciaBancaria */
	        const totalElements = data.totalElements;
	
	        this.adjustNullEntitySlots(items);
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: AgenciaBancariaListFilter): HttpParams {
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
	replicateAgenciaBancaria(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateAgenciaBancariaPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateAgenciaBancaria`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterAgenciaBancaria(filter: AgenciaBancariarListFilter): Promise<TotaisfilterAgenciaBancaria> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterAgenciaBancaria>(`${this.url}/getTotaisfilterAgenciaBancaria`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterAgenciaBancaria;
	      return result;
	    });
	}
	*/
}

