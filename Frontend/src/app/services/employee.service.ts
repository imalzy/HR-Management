import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IEmployee, IUPAPIResponse } from '../models/Employee.interface';

@Injectable()
export class EmployeeService {
  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<IUPAPIResponse<IEmployee[]>> {
    const httpParms = new HttpParams();
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'application/json');
    httpHeader.append('accept', 'application/json');
    httpParms
      .set('sort', 'id')
      .set('order', 'asc')
      .set('search', '')
      .set('limit', 10)
      .set('page', 1);

    console.log(httpHeader);
    return this.httpClient.get<IUPAPIResponse<IEmployee[]>>(
      this.baseUrl + '/employees',
      {
        headers: httpHeader,
        params: httpParms,
      },
    );
  }
}
