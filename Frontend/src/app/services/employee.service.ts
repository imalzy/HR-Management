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
      .set('limit', 10)
      .set('page', page);

    return this.httpClient.get<IUPAPIResponse<IEmployee[]>>(
      this.baseUrl + '/employees',
      {
        headers,
        params,
      },
    );
  }
}
