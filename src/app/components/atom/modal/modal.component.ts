import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'Modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonComponent],
})
export class ModalComponent {
  @Input() body: string = '';
  @Output() closeMeEvent = new EventEmitter<void>();
  @Output() confirmEvent = new EventEmitter<void>();

  cancel(): void {
    this.closeMeEvent.emit();
  }

  confirm(): void {
    this.confirmEvent.emit();
  }
}
