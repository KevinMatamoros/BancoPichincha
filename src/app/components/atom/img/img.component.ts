import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'Image',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ImgComponent {
  @Input() src!: string;
  @Input() alt!: string;
}
