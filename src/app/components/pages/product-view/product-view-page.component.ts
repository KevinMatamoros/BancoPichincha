import { Component } from '@angular/core';
import { ProductViewTemplateComponent } from '@templates';

@Component({
  selector: 'ProductViewPage',
  templateUrl: './product-view-page.component.html',
  styleUrls: ['./product-view-page.component.scss'],
  standalone: true,
  imports: [ProductViewTemplateComponent],
})
export class ProductViewPageComponent {}
