import { PlanoConta } from './../planoconta/planoconta.model';
import { FormaPagamento } from './../enums/financeiro-contaspagar-enums.model';
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
	planoContas: PlanoConta;
	formaPagamento: FormaPagamento;
	outrosDescricao: string;
	contaBancaria: ContaBancaria;
	cartaoCredito: CartaoCredito;
	dataPagamento: Date;
	valorDesconto: number;
	valorMulta: number;
	valorJuros: number;
	valorAcrescimos: number;
	valorPago: number;
	fornecedor: Fornecedor;
	numDocumento: string;
	observacoes: string;
	agrupador: string;
}

export class ContaPagarAutoComplete {
	id: string;
	descricao: string;
}

export class ContaPagarSumFields {
	sumValor: number;
	sumValorDesconto: number;
	sumValorMulta: number;
	sumValorJuros: number;
	sumValorAcrescimos: number;
	sumValorPago: number;
}
