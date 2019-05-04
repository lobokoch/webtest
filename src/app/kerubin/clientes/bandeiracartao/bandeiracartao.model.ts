
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

export class BandeiraCartaoNomeAutoComplete {
	nome: string;
}

export class BandeiraCartaoListFilter extends PaginationFilter {
	
	nome: BandeiraCartaoNomeAutoComplete[];
}

export class BandeiraCartao {
	id: string;
	nome: string;
}

export class BandeiraCartaoAutoComplete {
	id: string;
	nome: string;
}

export class BandeiraCartaoSumFields {
}
