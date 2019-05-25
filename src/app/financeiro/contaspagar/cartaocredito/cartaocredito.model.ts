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
	valorLimite: number;
	bandeiraCartao: BandeiraCartao;
	ativo: boolean = true;
	deleted: boolean = true;
}

export class CartaoCreditoAutoComplete {
	id: string;
	nomeTitular: string;
	numeroCartao: string;
}

export class CartaoCreditoSumFields {
}
