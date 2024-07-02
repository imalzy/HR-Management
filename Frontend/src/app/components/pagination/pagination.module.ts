import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [PaginationComponent],
})
export class PaginationModule {}
