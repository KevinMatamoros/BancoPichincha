import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TypographyComponent } from '../../atom/typography/typography.component';
import { Size } from '../../atom/typography/utils';

@Component({
  selector: 'Paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
  imports: [CommonModule, TypographyComponent],
})
export class PaginatorComponent {
  readonly pagination = [
    { value: undefined, label: 'Todos' },
    { value: 3, label: '3' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
  ];

  @Input() rowNumber = 0;
  @Output() paginationTrigger = new EventEmitter<number>();

  size = Size;
  selectedCTN = { value: undefined, label: 'Todos' };

  get textResult(): string {
    return `${this.rowNumber} Resultado${this.rowNumber === 1 ? '' : 's'}`;
  }

  selectPagination(event: any): void {
    const eventValue = (event.target as HTMLInputElement).value;
    const value = eventValue === 'undefined' ? undefined : Number.parseInt(eventValue);
    this.paginationTrigger.emit(value);
  }
}
