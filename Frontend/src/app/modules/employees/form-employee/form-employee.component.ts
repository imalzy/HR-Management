import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.scss',
})
export class FormEmployeeComponent {
  formGroup!: FormGroup;
  constructor() {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      username: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      birthDate: new FormControl('', Validators.compose([Validators.required])),
      basicSalary: new FormControl(
        0,
        Validators.compose([Validators.required]),
      ),
      status: new FormControl('', Validators.compose([Validators.required])),
      group: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl(
        '',
        Validators.compose([Validators.required]),
      ),
    });
  }
}
