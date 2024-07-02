/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { IEmployee, IUPAPIResponse } from '../models/Employee.interface';
import { environment } from '../../environments/environment';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return employees', () => {
    const expectedEmployees: IUPAPIResponse<IEmployee[]> = {
      data: [
        {
          id: 6,
          username: 'Puspa94',
          lastName: 'Febian',
          firstName: 'Jumadi',
          email: 'Jumadi.Febian@gmail.co.id',
          birthDate: '0006-06-10T16:47:36.583Z',
          status: true,
          group: 'Sports',
          description: 'Feb 22nd 24',
          basicSalary: '18373013.86',
        },
        {
          id: 7,
          username: 'Eluh_Little76',
          lastName: 'Ningrum',
          firstName: 'Najwa',
          email: 'Najwa.Ningrum43@yahoo.co.id',
          birthDate: '0000-04-16T08:32:16.597Z',
          status: true,
          group: 'Electronics',
          description: 'Feb 22nd 24',
          basicSalary: '13666731.66',
        },
        {
          id: 8,
          username: 'Malik.Medhurst39',
          lastName: 'Rachmawati',
          firstName: 'Syahrini',
          email: 'Syahrini_Rachmawati@gmail.com',
          birthDate: '0025-01-19T13:28:33.631Z',
          status: true,
          group: 'Kids',
          description: 'Feb 22nd 24',
          basicSalary: '18492210.65',
        },
        {
          id: 9,
          username: 'Harjasa11',
          lastName: 'Fernanda',
          firstName: 'Jamalia',
          email: 'Jamalia_Fernanda96@yahoo.co.id',
          birthDate: '0009-09-21T17:53:23.688Z',
          status: false,
          group: 'Garden',
          description: 'Feb 22nd 24',
          basicSalary: '11793637.20',
        },
        {
          id: 10,
          username: 'Sakura12',
          lastName: 'Handayani',
          firstName: 'Laila',
          email: 'Laila_Handayani@gmail.com',
          birthDate: '0005-06-26T19:48:22.538Z',
          status: true,
          group: 'Garden',
          description: 'Feb 22nd 24',
          basicSalary: '23409811.34',
        },
      ],
      total: 2,
      page: 1,
      limit: 10,
    };
    service
      .getEmployees('name', 'asc', 1)
      .subscribe((employees: IUPAPIResponse<IEmployee[]>) => {
        expect(employees).toEqual(expectedEmployees);
      });
    const req = httpMock.expectOne(
      `${environment.baseUrl}/employees?sort=name&order=asc&search=&limit=10&page=1`,
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Accept')).toBe('application/json');
    req.flush(expectedEmployees);
  });

  it('should handle error', () => {
    service.getEmployees('name', 'asc', 1).subscribe(
      () => fail('Expected error, but got success'),
      (error: any) => {
        expect(error.error).toEqual({ message: 'Error occurred' });
        expect(error.status).toBe(500);
      },
    );
    const req = httpMock.expectOne(
      `${environment.baseUrl}/employees?sort=name&order=asc&search=&limit=10&page=1`,
    );
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Error occurred'));
  });
});
