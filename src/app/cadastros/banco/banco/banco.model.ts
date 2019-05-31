/**********************************************************************************************
Code generated with MKL Plug-in version: 3.4.1
Code generated at time stamp: 2019-05-30T20:21:04.449
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


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

export class BancoNomeAutoComplete {
	nome: string;
}

export class BancoListFilter extends PaginationFilter {
	
	nome: BancoNomeAutoComplete[];
}

export class Banco {
	id: string;
	numero: string;
	nome: string;
}

export class BancoAutoComplete {
	id: string;
	numero: string;
	nome: string;
}

export class BancoSumFields {
}
