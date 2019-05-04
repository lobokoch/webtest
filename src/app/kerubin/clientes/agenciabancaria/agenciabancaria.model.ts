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
	numero: string;
	digito: string;
	endereco: string;
	banco: Banco;
}

export class AgenciaBancariaAutoComplete {
	id: string;
	numero: string;
	digito: string;
	endereco: string;
}

export class AgenciaBancariaSumFields {
}
