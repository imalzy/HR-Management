/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit, AfterViewInit {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() totalPagination: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() perPageItemChange = new EventEmitter<number>();

  @Input() itemsPerPage: number = 5;
  itemPerPageControl = new FormControl();
  totalPages: number = 0;

  ngOnInit() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  ngAfterViewInit(): void {
    this.itemPerPageControl.setValue(this.itemsPerPage);
    this.itemPerPageControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.itemsPerPage = value;
        this.perPageItemChange.emit(this.itemsPerPage);
      });
  }

  get pages(): (number | string)[] {
    if (this.totalPages <= 7) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      const current = this.currentPage;
      const last = this.totalPages;
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      let l;

      range.push(1);
      for (let i = current - delta; i <= current + delta; i++) {
        if (i >= 1 && i <= last) {
          range.push(i);
        }
      }
      range.push(last);

      for (const i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }

      return rangeWithDots;
    }
  }

  changePage(page: any) {
    if (page === this.totalPagination + 1 || page == 0) {
      return;
    }

    if (page !== this.currentPage && page !== '...') {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}
