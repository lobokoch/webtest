import { BandeiraCartao } from './../bandeiracartao/bandeiracartao.model';
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

export class CartaoCreditoListFilter extends PaginationFilter {
	
}

export class CartaoCredito {
	id: string;
	titular: string;
	numeroCartao: string;
	validade: Date;
	codigoSeguranca: string;
	limite: number;
	bandeiraCartao: BandeiraCartao;
	banco: Banco;
	ativo: boolean;
}

export class CartaoCreditoAutoComplete {
	id: string;
	titular: string;
	numeroCartao: string;
}

export class CartaoCreditoSumFields {
}
