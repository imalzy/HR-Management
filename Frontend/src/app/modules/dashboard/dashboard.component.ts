import { Component, inject, OnInit } from '@angular/core';
import {
  faChartPie,
  faChartBar,
  faArrowUp,
  faArrowDown,
  faUsers,
  faPercentage,
} from '@fortawesome/free-solid-svg-icons';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../models/Employee.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [EmployeeService],
})
export class DashboardComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  faChartPie = faChartPie;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faUsers = faUsers;
  faPercent = faPercentage;
  faChartBar = faChartBar;

  sort: string = 'firstName';
  order: 'asc' | 'desc' = 'asc';
  search: string = '';
  totalPage: number = 0;
  limit = 5;
  page = 1;
  totalItems: number = 0;
  showModal = false;
  employee: IEmployee = {} as IEmployee;
  items: IEmployee[] = [];

  ngOnInit(): void {
    this.refresh();
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
}
