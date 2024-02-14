import { Component } from '@angular/core';
import { ProductAddEditTemplateComponent } from '../../templates/product-add-edit/product-add-edit-template.component';

@Component({
  selector: 'ProductAddPage',
  templateUrl: './product-add-page.component.html',
  styleUrls: ['./product-add-page.component.scss'],
  standalone: true,
  imports: [ProductAddEditTemplateComponent],
})
export class ProductAddPageComponent {}
