/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { IColumnTable, IEmployee } from '../../../models/Employee.interface';
import { GlobalStoreService } from '../../../services/global-store.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss',
})
export class ListEmployeeComponent implements OnInit, AfterViewInit {
  private employeeService = inject(EmployeeService);
  private globalStore = inject(GlobalStoreService);
  private router = inject(Router);
  limit = 5;
  page = 1;
  totalItems: number = 0;

  tableHeader: IColumnTable[] = [
    {
      columnName: 'Firstname',
      columnValue: 'firstName',
    },
    {
      columnName: 'Email',
      columnValue: 'email',
    },
    {
      columnName: 'Status',
      columnValue: 'status',
    },
    {
      columnName: 'Group',
      columnValue: 'group',
    },
    {
      columnName: 'Salary',
      columnValue: 'basicSalary',
    },

    {
      columnName: 'Action',
      columnValue: '',
    },
  ];
  items: IEmployee[] = [];
  sort: string = 'firstName';
  order: 'asc' | 'desc' = 'asc';
  search: string = '';
  totalPage: number = 0;

  ngOnInit(): void {
    this.refresh();
  }

  async ngAfterViewInit(): Promise<void> {
    this.globalStore.searchGlobal$
      .pipe(distinctUntilChanged())
      .subscribe((search) => {
        this.search = search;
        if (search !== '') this.refresh();
      });
  }

  refresh(): void {
    this.employeeService
      .getEmployees(this.sort, this.order, this.page, this.search, this.limit)
      .subscribe((res) => {
        this.items = res.data as IEmployee[];
        this.totalItems = res.total ?? 0;
        this.page = res.page ?? 1;
        this.totalPage = res.totalPages ?? 1;
      });
  }

  onSort($event: { column: string; order: 'asc' | 'desc' }) {
    this.sort = $event.column;
    this.order = $event.order;
    this.refresh();
  }

  changePage($event: any) {
    this.page = $event;
    this.refresh();
  }

  changePerPageItem($event: any) {
    this.limit = $event;
    this.refresh();
  }

  addEmployee() {
    this.router.navigateByUrl('/employee/form');
  }
}
