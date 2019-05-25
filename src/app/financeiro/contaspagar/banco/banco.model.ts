
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
	deleted: boolean = true;
}

export class BancoAutoComplete {
	id: string;
	numero: string;
	nome: string;
}

export class BancoSumFields {
}
