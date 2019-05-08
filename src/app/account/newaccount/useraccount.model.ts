
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

export class UserAccountListFilter extends PaginationFilter {

}

export class UserAccount {
	name: string;
	email: string;
  password: string;
  accountType: string;
}

export class UserAccountAutoComplete {
	name: string;
}

export class UserAccountSumFields {
}

export class AccountCreatedDTO {
  text: string;
}

export class SysUser {
  id: string;
  name: string;
  email: string;
  accountType: string;
}
