import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { IEmployee } from '../../../models/Employee.interface';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.scss',
})
export class FormEmployeeComponent {
  employeeServices = inject(EmployeeService);
  router = inject(Router);

  errorMessages = {
    required: 'This field is required',
    email: 'Enter a valid email address',
  };

  formGroup = new FormGroup({
    firstName: new FormControl('', Validators.compose([Validators.required])),
    lastName: new FormControl('', Validators.compose([Validators.required])),
    username: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email]),
    ),
    birthDate: new FormControl('', Validators.compose([Validators.required])),
    basicSalary: new FormControl(0, Validators.compose([Validators.required])),
    status: new FormControl('', Validators.compose([Validators.required])),
    group: new FormControl('', Validators.compose([Validators.required])),
    description: new FormControl('', Validators.compose([Validators.required])),
  });
  constructor(private spinner: NgxSpinnerService) {}

  get firstName() {
    return this.formGroup.get('firstName');
  }

  get lastName() {
    return this.formGroup.get('lastName');
  }

  get username() {
    return this.formGroup.get('username');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get birthDate() {
    return this.formGroup.get('birthDate');
  }

  get basicSalary() {
    return this.formGroup.get('basicSalary');
  }

  get status() {
    return this.formGroup.get('status');
  }

  get group() {
    return this.formGroup.get('group');
  }

  get description() {
    return this.formGroup.get('description');
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
    }
    this.spinner.show();
    const data = this.formGroup.value as IEmployee;
    this.employeeServices.addEmployee(data).subscribe(
      (res) => {
        this.spinner.hide();
        if (res) {
          setTimeout(() => {
            this.router.navigateByUrl('/employee/list');
          }, 200);
        }
      },
      () => {
        this.spinner.hide();
      },
    );
  }
}
