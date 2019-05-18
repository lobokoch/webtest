import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { HttpClientWithToken } from '../../../security/http-client-token';
import { environment } from 'src/environments/environment';
import {TreeNode} from 'primeng/api';


@Injectable()
export class PlanoContasTreeService {

  url = environment.apiUrl + '/financeiro/plano_contas/entities/planoConta';

  constructor(private http: HttpClientWithToken) { }

  private getHeaders(): Headers {
		const headers = new Headers();

	    headers.append('Content-Type', 'application/json');
	    return headers;
	}

  getPlanoContasTree(query: string): Promise<TreeNode[]> {
    const headers = this.getHeaders();

    let params = new HttpParams();
    params = params.set('query', query);

    return this.http.get<TreeNode[]>(`${this.url}/getPlanoContasTree`, { headers, params })
      .toPromise()
      .then(response => {
        const result = response as TreeNode[];
        return result;
      });
  }

  getPlanoContasNode(id: string): Promise<TreeNode> {
    const headers = this.getHeaders();

    let params = new HttpParams();
    params = params.set('id', id);

    return this.http.get<TreeNode>(`${this.url}/getPlanoContasNode`, { headers, params })
      .toPromise()
      .then(response => {
        const result = response as TreeNode;
        return result;
      });
  }


}
