import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss',
})
export class ListEmployeeComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private limit = 10;
  private page = 1;

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((res) => {
      console.log(res);
    });
  }
}
