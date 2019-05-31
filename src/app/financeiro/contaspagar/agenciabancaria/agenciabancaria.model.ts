/**********************************************************************************************
Code generated with MKL Plug-in version: 3.4.1
Code generated at time stamp: 2019-05-30T20:20:55.617
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { Banco } from './../banco/banco.model';

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

export class AgenciaBancariaListFilter extends PaginationFilter {
	
}

export class AgenciaBancaria {
	id: string;
	banco: Banco;
	numeroAgencia: string;
	digitoAgencia: string;
	endereco: string;
	deleted: boolean = false;
}

export class AgenciaBancariaAutoComplete {
	id: string;
	numeroAgencia: string;
	digitoAgencia: string;
	endereco: string;
}

export class AgenciaBancariaSumFields {
}
