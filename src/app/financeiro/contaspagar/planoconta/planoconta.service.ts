
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClientWithToken } from '../../../security/http-client-token';

import { PlanoConta } from './planoconta.model';
import { PlanoContaAutoComplete } from './planoconta.model';
import { PlanoContaListFilter } from './planoconta.model';
import { PlanoContaCodigoAutoComplete } from './planoconta.model';
import { PlanoContaDescricaoAutoComplete } from './planoconta.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PlanoContaService {
	
	// TODO: Provisório
	// url = 'http://localhost:9101/entities/planoConta';
	url = environment.apiUrl + '/financeiro/contas_pagar/entities/planoConta';
	
	constructor(private http: HttpClientWithToken) { }
	
	// TODO: Provisório
	private getHeaders(): Headers {
		const headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
	    return headers;
	}
	
	create(planoConta: PlanoConta): Promise<PlanoConta> {
		const headers = this.getHeaders();    
	
	    return this.http.post(this.url, planoConta, { headers })
	    .toPromise()
	    .then(response => {
	      const created = response as PlanoConta;
	      this.adjustNullEntitySlots([created]);
	      return created;
	    });
	}
	
	update(planoConta: PlanoConta): Promise<PlanoConta> {
	    const headers = this.getHeaders();
	
	    return this.http.put(`${this.url}/${planoConta.id}`, planoConta, { headers })
	    .toPromise()
	    .then(response => {
	      const updated = response as PlanoConta;
	      this.adjustNullEntitySlots([updated]);
	      return updated;
	    });
	}
	
	delete(id: string): Promise<void> {
	    return this.http.delete(`${this.url}/${id}`)
	    .toPromise()
	    .then(() => null);
	}
	
	retrieve(id: string): Promise<PlanoConta> {
	    const headers = this.getHeaders();
	    return this.http.get<PlanoConta>(`${this.url}/${id}`, { headers })
	    .toPromise()
	    .then(response => {
	      const planoConta = response as PlanoConta;
	      this.adjustNullEntitySlots([planoConta]);
	      return planoConta;
	    });
	}
	
	
	
	private adjustNullEntitySlots(entityList: PlanoConta[]) {
		/*entityList.forEach(planoConta => {
		      if (!planoConta.planoContaPai) {
		        planoConta.planoContaPai = new PlanoConta();
		      }
		      	
		});*/
	}
	
	autoComplete(query: string): Promise<PlanoContaAutoComplete[]> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<PlanoContaAutoComplete[]>(`${this.url}/autoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as PlanoContaAutoComplete[];
	        return result;
	      });
	
	}
	
	
	planoContaCodigoAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<any>(`${this.url}/planoContaCodigoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as PlanoContaCodigoAutoComplete[];
	        return result;
	      });
	
	}
	
	planoContaDescricaoAutoComplete(query: string): Promise<any> {
	    const headers = this.getHeaders();
	
	    let params = new HttpParams();
	    params = params.set('query', query);
	
	    return this.http.get<any>(`${this.url}/planoContaDescricaoAutoComplete`, { headers, params })
	      .toPromise()
	      .then(response => {
	        const result = response as PlanoContaDescricaoAutoComplete[];
	        return result;
	      });
	
	}
	
	planoContaList(planoContaListFilter: PlanoContaListFilter): Promise<any> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(planoContaListFilter);
	
	    return this.http.get<any>(this.url, { headers, params })
	      .toPromise()
	      .then(response => {
	        const data = response;
	        const items = data.content; /* array of PlanoConta */
	        const totalElements = data.totalElements;
	
	        this.adjustNullEntitySlots(items);
	
	        const result = {
	          items,
	          totalElements
	        };
	
	        return result;
	      });
	}
	
	
	mountAndGetSearchParams(filter: PlanoContaListFilter): HttpParams {
	    let params = new HttpParams();
	    if (filter.pageNumber) {
	      params = params.set('page', filter.pageNumber.toString());
	    }
	
	    if (filter.pageSize) {
	      params = params.set('size', filter.pageSize.toString());
	    }
		
		// codigo
		if (filter.codigo) {
			const codigo = filter.codigo.map(item => item.codigo).join(',');
			params = params.set('codigo', codigo);
		}
		
		// descricao
		if (filter.descricao) {
			const descricao = filter.descricao.map(item => item.descricao).join(',');
			params = params.set('descricao', descricao);
		}
		
		// ativoIsNotNull
		if (filter.ativoIsNotNull) {
			const value = filter.ativoIsNotNull ? 'true' : 'false';
			params = params.set('ativoIsNotNull', value);
		}
		
		// ativoIsNull
		if (filter.ativoIsNull) {
			const value = filter.ativoIsNull ? 'true' : 'false';
			params = params.set('ativoIsNull', value);
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
	replicatePlanoConta(id: string, groupId: string, quantity: number): Promise<boolean> {
	    const headers = this.getHeaders();
	
	    const payload = new ReplicatePlanoContaPayload(id, quantity, groupId);
	    return this.http.post(`${this.url}/replicatePlanoConta`, payload, { headers } )
	    .toPromise()
	    .then(response => {
	      return response === true;
	    });
	}
		
	getTotaisfilterPlanoConta(filter: PlanoContarListFilter): Promise<TotaisfilterPlanoConta> {
	    const headers = this.getHeaders();
	
	    const params = this.mountAndGetSearchParams(filter);
	    return this.http.get<TotaisfilterPlanoConta>(`${this.url}/getTotaisfilterPlanoConta`, { headers, params })
	    .toPromise()
	    .then(response => {
	      const result = response as TotaisfilterPlanoConta;
	      return result;
	    });
	}
	*/
}

