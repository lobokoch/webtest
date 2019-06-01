/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.1
Code generated at time stamp: 2019-06-01T10:38:43.216
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { TipoPlanoContaFinanceiro } from './../enums/financeiro-planocontas-enums.model';
import { TipoReceitaDespesa } from './../enums/financeiro-planocontas-enums.model';

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

export class PlanoContaCodigoAutoComplete {
	codigo: string;
}

export class PlanoContaDescricaoAutoComplete {
	descricao: string;
}

export class PlanoContaListFilter extends PaginationFilter {
	
	codigo: PlanoContaCodigoAutoComplete[];
	
	descricao: PlanoContaDescricaoAutoComplete[];
	
	ativoIsNotNull: boolean;
	ativoIsNull: boolean;
}

export class PlanoConta {
	id: string;
	codigo: string;
	descricao: string;
	tipoFinanceiro: TipoPlanoContaFinanceiro;
	tipoReceitaDespesa: TipoReceitaDespesa;
	planoContaPai: PlanoConta;
	ativo: boolean = true;
}

export class PlanoContaAutoComplete {
	id: string;
	codigo: string;
	descricao: string;
}

export class PlanoContaSumFields {
}
