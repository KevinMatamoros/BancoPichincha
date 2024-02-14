import { NgClass } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Size } from './utils';

@Component({
  selector: 'Typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'],
  imports: [NgClass],
  standalone: true,
})
export class TypographyComponent {
  @Input() text!: string | null;
  @Input() size: Size = Size.paragraph;
  @Input() color!: string;
}
