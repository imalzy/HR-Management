/* eslint-disable @typescript-eslint/no-unused-vars */
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { IEmployee } from '../../../models/Employee.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.scss',
})
export class FormEmployeeComponent implements OnInit, AfterViewInit {
  employeeServices = inject(EmployeeService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

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
  action: string = 'add';

  constructor(private spinner: NgxSpinnerService) {
    this.activatedRoute.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params: Params) => {
      console.log(params)
      console.log('getCurrentNavigation ', this.router.getCurrentNavigation());
      const currentNav = this.router?.getCurrentNavigation();
      if (currentNav && currentNav.extras?.state) {
        this.action = currentNav?.extras?.state['action'];
      }
    });
  }


  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as number | string;
    console.log(id);
    if(this.action === 'edit'){
      this.getEmployeeById(id);
    }
  }

    
  ngAfterViewInit(): void {
    this.birthDate?.valueChanges.subscribe((value) => {
        console.log(value);
    })
  }
  

  getEmployeeById(id: number | string) {
    this.spinner.show();
    this.employeeServices
      .getEmployeesById(id)
      .pipe()
      .subscribe((res) => {
        this.spinner.hide();
        if (res) {
          this.firstName?.patchValue(res && res?.firstName ? res?.firstName : '');
          this.lastName?.patchValue(res && res?.lastName ? res?.lastName : '');
          this.username?.patchValue(res && res?.username ? res?.username : '');
          this.email?.patchValue(res && res?.email ? res?.email : '');
          this.birthDate?.patchValue(res && res?.birthDate ? res?.birthDate.toString() : '');
          this.basicSalary?.patchValue(res && res?.basicSalary ? parseInt(res?.basicSalary) : 0);
          this.status?.patchValue(res && res?.status ? res?.status.toString() : '');
          this.group?.patchValue(res && res?.group ? res?.group : '');
          this.description?.patchValue(res && res?.description ? res?.description : '');
        }
      });
  }

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
    this.employeeServices.addEmployee(data).pipe(takeUntilDestroyed()).subscribe(
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
