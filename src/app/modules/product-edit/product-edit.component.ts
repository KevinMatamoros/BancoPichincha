import { Component } from '@angular/core';
import { ProductEditPageComponent } from '@pages';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  standalone: true,
  imports: [ProductEditPageComponent]
})
export class ProductEditComponent {

}
