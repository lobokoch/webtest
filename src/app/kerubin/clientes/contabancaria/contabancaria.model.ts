import { AgenciaBancaria } from './../agenciabancaria/agenciabancaria.model';
import { TipoContaBancaria } from './../enums/kerubin-clientes-enums.model';
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

export class ContaBancariaNumeroContaAutoComplete {
	numeroConta: string;
}

export class ContaBancariaListFilter extends PaginationFilter {
	
	numeroConta: ContaBancariaNumeroContaAutoComplete[];
}

export class ContaBancaria {
	id: string;
	titular: string;
	agencia: AgenciaBancaria;
	tipoContaBancaria: TipoContaBancaria;
	numeroConta: string;
	digito: string;
	saldo: number;
	numeroCartao: string;
	codigoSeguranca: string;
	validade: Date;
	bandeiraCartao: BandeiraCartao;
	ativo: boolean;
}

export class ContaBancariaAutoComplete {
	id: string;
	titular: string;
	numeroConta: string;
	digito: string;
}

export class ContaBancariaSumFields {
}
