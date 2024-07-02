export interface IEmployee {
  id?: number;
  username?: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  birthDate?: Date | string;
  status?: boolean | string;
  group?: string;
  description?: string;
  basicSalary?: string;
}

export interface IUPAPIResponse<T> {
  data?: T;
  total?: number;
  page?: number;
  limit?: number;
}

export interface IColumnTable {
  columnName: string;
  columnValue: string;
}
