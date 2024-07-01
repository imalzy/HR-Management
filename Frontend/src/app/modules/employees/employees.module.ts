import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { TableModule } from '../../components/table/table.module';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

const routes: Routes = [
  {
    path: 'list',
    component: ListEmployeeComponent,
  },
  {
    path: 'form',
    component: FormEmployeeComponent,
  },
];

@NgModule({
  declarations: [ListEmployeeComponent, FormEmployeeComponent],
  imports: [CommonModule, TableModule, RouterModule.forChild(routes)],
  providers: [EmployeeService],
})
export class EmployeesModule {}
