import { ContaBancaria } from './../contabancaria/contabancaria.model';
import { CartaoCredito } from './../cartaocredito/cartaocredito.model';
import { Fornecedor } from './../fornecedor/fornecedor.model';

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

export class ContaPagarDescricaoAutoComplete {
	descricao: string;
}

export class ContaPagarAgrupadorAutoComplete {
	agrupador: string;
}

export class ContaPagarListFilter extends PaginationFilter {
	
	descricao: ContaPagarDescricaoAutoComplete[];
	
	dataVencimentoFrom: Date;
	dataVencimentoTo: Date;
	
	dataPagamentoIsNotNull: boolean;
	dataPagamentoIsNull: boolean;
	
	agrupador: ContaPagarAgrupadorAutoComplete[];
}

export class ContaPagar {
	id: string;
	descricao: string;
	valor: number;
	dataVencimento: Date;
	contaBancaria: ContaBancaria;
	valorContaBancaria: number;
	cartaoCredito: CartaoCredito;
	valorCartaoCredito: number;
	valorOutrasFormasPagamento: number;
	dataPagamento: Date;
	valorDesconto: number;
	valorMulta: number;
	valorJuros: number;
	valorAcrescimos: number;
	valorPago: number;
	numDocumento: string;
	observacoes: string;
	fornecedor: Fornecedor;
	agrupador: string;
}

export class ContaPagarAutoComplete {
	id: string;
	descricao: string;
}

export class ContaPagarSumFields {
	sumValor: number;
	sumValorContaBancaria: number;
	sumValorCartaoCredito: number;
	sumValorOutrasFormasPagamento: number;
	sumValorDesconto: number;
	sumValorMulta: number;
	sumValorJuros: number;
	sumValorAcrescimos: number;
	sumValorPago: number;
}
