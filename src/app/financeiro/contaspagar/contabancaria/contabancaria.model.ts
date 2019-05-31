/**********************************************************************************************
Code generated with MKL Plug-in version: 3.4.1
Code generated at time stamp: 2019-05-30T20:20:55.617
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { AgenciaBancaria } from './../agenciabancaria/agenciabancaria.model';
import { TipoContaBancaria } from './../enums/financeiro-contaspagar-enums.model';

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

export class ContaBancariaNumeroContaAutoComplete {
	numeroConta: string;
}

export class ContaBancariaListFilter extends PaginationFilter {
	
	numeroConta: ContaBancariaNumeroContaAutoComplete[];
}

export class ContaBancaria {
	id: string;
	nomeTitular: string;
	agencia: AgenciaBancaria;
	tipoContaBancaria: TipoContaBancaria;
	numeroConta: string;
	digito: string;
	dataValidade: Date;
	ativo: boolean = true;
	deleted: boolean = false;
}

export class ContaBancariaAutoComplete {
	id: string;
	nomeTitular: string;
	numeroConta: string;
}

export class ContaBancariaSumFields {
}
