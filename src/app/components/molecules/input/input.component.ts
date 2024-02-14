import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  INJECTOR,
  Inject,
  Injector,
  Input,
  OnInit,
  Output,
  Provider,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

import { v1 as uuidv1 } from 'uuid';
import { TypographyComponent } from '../../atom/typography/typography.component';
import { Size } from '../../atom/typography/utils';
import { ERRORS_TEXT } from './utils';

const COUNTRY_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'InputText',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TypographyComponent],
  providers: [COUNTRY_CONTROL_VALUE_ACCESSOR],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  readonly size = Size;
  @Input() id = uuidv1();
  @Input() type: 'text' | 'date' = 'text';
  @Input() legendText!: string;
  
  @Input() min!: string;

  @Input() minLength!: number;
  @Input() maxLength!: number;

  @Input() sizeLegend = this.size.heading_4;
  @Input() placeholder: string = '';
  @Output() blurTrigger: EventEmitter<void> = new EventEmitter<void>();

  _control!: NgControl;

  onTouched!: Function;
  onChanged!: Function;
  disabled!: boolean;
  value = '';

  get errorMessage(): string | null {
    if (!this._control.control?.errors) return null;
    const errorKey: string = Object.keys(this._control.control?.errors)[0];
    return ERRORS_TEXT[errorKey as keyof typeof ERRORS_TEXT];
  }

  get isTouched(): boolean | null {
    return this._control.touched;
  }

  get isDisabled(): boolean {
    return !!(this._control.status === 'DISABLED');
  }

  constructor(@Inject(INJECTOR) private injector: Injector) {}

  ngOnInit(): void {
    this._control = this.injector.get(NgControl);
  }

  handleChange(change: any) {
    this.onTouched();
    this.onChanged(change);
  }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  blurInput(event: unknown): void {
    this.onTouched(event);
    this.blurTrigger.emit();
  }
}
