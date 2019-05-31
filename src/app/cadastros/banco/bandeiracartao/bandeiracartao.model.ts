/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.0
Code generated at time stamp: 2019-05-31T07:34:53.684
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/


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

export class BandeiraCartaoNomeBandeiraAutoComplete {
	nomeBandeira: string;
}

export class BandeiraCartaoListFilter extends PaginationFilter {
	
	nomeBandeira: BandeiraCartaoNomeBandeiraAutoComplete[];
}

export class BandeiraCartao {
	id: string;
	nomeBandeira: string;
}

export class BandeiraCartaoAutoComplete {
	id: string;
	nomeBandeira: string;
}

export class BandeiraCartaoSumFields {
}
