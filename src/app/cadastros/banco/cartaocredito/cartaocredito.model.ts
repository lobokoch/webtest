/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.1
Code generated at time stamp: 2019-06-01T10:39:13.215
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Banco } from './../banco/banco.model';
import { BandeiraCartao } from './../bandeiracartao/bandeiracartao.model';

export class SortField {
  field: string;
  order: number;

  constructor(field: string, order: number) {
    this.field = field;
    this.order = order;
  }
}

export class PaginationFilter {
  pageNumber: number;
  pageSize: number;
  sortField: SortField;

  constructor() {
    this.pageNumber = 0;
    this.pageSize = 10;
  }
}

export class CartaoCreditoListFilter extends PaginationFilter {
	
}

export class CartaoCredito {
	id: string;
	banco: Banco;
	nomeTitular: string;
	numeroCartao: string;
	validade: Date;
	codigoSeguranca: string;
	valorLimite: number;
	bandeiraCartao: BandeiraCartao;
	ativo: boolean = true;
}

export class CartaoCreditoAutoComplete {
	id: string;
	nomeTitular: string;
	numeroCartao: string;
}

export class CartaoCreditoSumFields {
}
