/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IEmployee, IUPAPIResponse } from '../models/Employee.interface';

@Injectable()
export class EmployeeService {
  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  getEmployees(
    sort: string,
    order: string,
    page: number,
    search: string,
    limit: number,
  ): Observable<IUPAPIResponse<IEmployee[]>> {
    const httpParms = new HttpParams();
    const httpHeader = new HttpHeaders();
    const headers = httpHeader
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const params = httpParms
      .set('sort', sort)
      .set('order', order)
      .set('search', search)
      .set('limit', limit)
      .set('page', page);

    return this.httpClient.get<IUPAPIResponse<IEmployee[]>>(
      this.baseUrl + '/employees',
      {
        headers,
        params,
      },
    );
  }

  getEmployeesById(
    id: number | string,
  ): Observable<IEmployee> {
    const httpHeader = new HttpHeaders();
    const headers = httpHeader
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.httpClient.get<IEmployee>(
      `${this.baseUrl}/employees/${id}`,
      {
        headers,
      },
    );
  }

  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.httpClient.post<IEmployee>(
      this.baseUrl + '/employees',
      employee,
    );
  }

  updateEmployee(
    id: number | string,
    data: IEmployee, 
  ): Observable<IEmployee> {
    const httpHeader = new HttpHeaders();
    const headers = httpHeader
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.httpClient.put<IEmployee>(
      `${this.baseUrl}/employees/${id}`, data,
      {
        headers,
      },
    );
  }

  deleteEmployee(id: any) {
    return this.httpClient.delete<any>(`${this.baseUrl}/employees/${id}`);
  }
}
