/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IColumnTable } from '../../models/Employee.interface';
import {
  faSort,
  faSortUp,
  faSortDown,
  faEdit,
  faTrash,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input({ required: true }) tableHeader: IColumnTable[] = [];
  @Input({ required: true }) tableData: any[] = [];
  @Output() changeSort = new EventEmitter<any>();
  @Output() clickAddEvent = new EventEmitter<any>();

  faSort = faSort;
  faSortDown = faSortDown;
  faSortUp = faSortUp;
  faEdit = faEdit;
  faTrash = faTrash;
  faCheck = faCheck;
  faTimes = faTimes;

  order: 'asc' | 'desc' = 'asc';
  fieldName: string = '';

  sort(column: string) {
    console.log(column, this.order);

    this.fieldName = column;
    if (this.order === 'asc') {
      this.order = 'desc';
    } else if (this.order === 'desc') {
      this.order = 'asc';
    }
    if (column == '') {
      return;
    }
    this.changeSort.emit({ column, order: this.order });
  }

  preview(item: any) {
    console.log(item);
  }
  edit(item: any) {
    console.log(item);
  }
}
