/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.1
Code generated at time stamp: 2019-06-01T10:39:06.126
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

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
	planoContas: PlanoConta;
	descricao: string;
	dataVencimento: Date;
	valor: number;
	formaPagamento: FormaPagamento;
	contaBancaria: ContaBancaria;
	cartaoCredito: CartaoCredito;
	outrosDescricao: string;
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
