/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.1
Code generated at time stamp: 2019-06-01T10:39:06.126
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
	deleted: boolean = false;
}

export class BancoAutoComplete {
	id: string;
	numero: string;
	nome: string;
}

export class BancoSumFields {
}
