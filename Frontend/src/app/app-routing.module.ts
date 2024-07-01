import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
    data: {
      title: 'Dashboard',
      animation: 'isLeft',
    },
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./modules/employees/employees.module').then(
        (m) => m.EmployeesModule,
      ),
    data: {
      title: 'Pegawai',
      animation: 'isRight',
    },
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
