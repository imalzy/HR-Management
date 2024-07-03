/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-output-native */
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Input()
  contentTemplate!: TemplateRef<any>;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
