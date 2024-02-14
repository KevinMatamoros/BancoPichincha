import { Component } from '@angular/core';
import { ProductAddPageComponent } from '@pages';

@Component({
  selector: 'ProductAddComponent',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  standalone: true,
  imports: [ProductAddPageComponent]
})
export class ProductAddComponent {

}
