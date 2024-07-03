import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  spinner = inject(NgxSpinnerService);

  errorMessages = {
    required: 'This field is required',
  };

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get password() {
    return this.form.get('password');
  }

  get username() {
    return this.form.get('username');
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    }
    this.spinner.show();
    const username = this.form.value?.username as string;
    const password = this.form.value?.password as string;
    this.authService.login(username, password).subscribe(
      (res) => {
        this.spinner.hide();
        if (res && res.token) {
          this.authService.storeToken(res.token);
          this.router.navigate(['/dashboard']);
        }
      },
      () => this.spinner.hide(),
    );
  }
}
