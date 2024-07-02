import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {
  @Input() control: AbstractControl | null = null;
  @Input() errors: { [key: string]: string } = {};

  get errorMessage(): string | null {
    if (this.control && this.control.errors && (this.control.dirty || this.control.touched)) {
      for (const key in this.control.errors) {
        if (this.errors[key]) {
          return this.errors[key];
        }
      }
    }
    return null;
  }
}
