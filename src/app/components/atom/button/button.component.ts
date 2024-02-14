import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ButtonField',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() disabled!: boolean;
  @Input() color: string = 'white';
  @Output() triggerAction: EventEmitter<void> = new EventEmitter<void>();
  
  clicked(): void {
    this.triggerAction.emit();
  }

}
