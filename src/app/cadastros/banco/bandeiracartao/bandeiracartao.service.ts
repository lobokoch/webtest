
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../security/http-client-token';

import { BandeiraCartao } from './bandeiracartao.model';
import { BandeiraCartaoAutoComplete } from './bandeiracartao.model';
import { BandeiraCartaoListFilter } from './bandeiracartao.model';
import { BandeiraCartaoNomeBandeiraAutoComplete } from './bandeiracartao.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BandeiraCartaoService {
	
	// TODO: Provisório
	// url = 'http://localhost:9101/entities/bandeiraCartao';
	url = environment.apiUrl + '/cadastros/banco/entities/bandeiraCartao';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(bandeiraCartao: BandeiraCartao): Promise<BandeiraCartao> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, bandeiraCartao, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as BandeiraCartao;
	      return created;
	    });
	}
	
	update(bandeiraCartao: BandeiraCartao): Promise<BandeiraCartao> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${bandeiraCartao.id}`, bandeiraCartao, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as BandeiraCartao;
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<BandeiraCartao> {
	    const headers = this.getHeaders();
	    return this.http.get<BandeiraCartao>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const bandeiraCartao = response as BandeiraCartao;
	      return bandeiraCartao;
	    });
	}
	
	
	
	
	autoComplete(query: string): Promise<BandeiraCartaoAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<BandeiraCartaoAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as BandeiraCartaoAutoComplete[];
	        return result;
	      });
	
	}
	
	
	bandeiraCartaoNomeBandeiraAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<any>(`${this.url}/bandeiraCartaoNomeBandeiraAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as BandeiraCartaoNomeBandeiraAutoComplete[];
	        return result;
	      });
	
	}
	
	bandeiraCartaoList(bandeiraCartaoListFilter: BandeiraCartaoListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(bandeiraCartaoListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of BandeiraCartao */
	        const totalElements = data.totalElements;
	
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: BandeiraCartaoListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// nomeBandeira
		if (filter.nomeBandeira) {
			const nomeBandeira = filter.nomeBandeira.map(item => item.nomeBandeira).join(',');
			params = params.set('nomeBandeira', nomeBandeira);
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
	replicateBandeiraCartao(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicateBandeiraCartaoPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicateBandeiraCartao`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterBandeiraCartao(filter: BandeiraCartaorListFilter): Promise<TotaisfilterBandeiraCartao> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterBandeiraCartao>(`${this.url}/getTotaisfilterBandeiraCartao`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterBandeiraCartao;
	      return result;
	    });
	}
	*/
}

