import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { TableModule } from '../../components/table/table.module';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { PaginationModule } from '../../components/pagination/pagination.module';
import { NumberOnlyDirective } from '../../directives/number-only.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from '../../components/form-error/form-error.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from '../../components/modal/modal.module';
const routes: Routes = [
  {
    path: 'list',
    component: ListEmployeeComponent,
    data: {
      title: 'Pegawai',
      animation: 'isRight',
    },
  },
  {
    path: 'form',
    component: FormEmployeeComponent,
    data: {
      title: 'Pegawai',
      animation: 'isRight',
    },
  },
  {
    path: 'form/:id',
    component: FormEmployeeComponent,
    data: {
      title: 'Pegawai',
      animation: 'isRight',
    },
  },
];

@NgModule({
  declarations: [
    ListEmployeeComponent,
    FormEmployeeComponent,
    NumberOnlyDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    PaginationModule,
    FormErrorModule,
    NgxSpinnerModule,
    ModalModule,
    RouterModule.forChild(routes),
  ],
  providers: [EmployeeService],
})
export class EmployeesModule {}
