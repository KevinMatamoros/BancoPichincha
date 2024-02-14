import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductAddEditTemplateComponent } from '../../templates/product-add-edit/product-add-edit-template.component';
import { FinanceProduct } from '@shared/models';

@Component({
  selector: 'ProductEditPage',
  templateUrl: './product-edit-page.component.html',
  styleUrls: ['./product-edit-page.component.scss'],
  standalone: true,
  imports: [ProductAddEditTemplateComponent],
})
export class ProductEditPageComponent implements OnInit, OnDestroy {
  productFinance: FinanceProduct = new FinanceProduct;

  ngOnInit(): void {
    const productStorage = localStorage.getItem('financeProduct');
    if (productStorage && productStorage !== 'undefined') this.productFinance = FinanceProduct.adapt(
      JSON.parse(
        productStorage
        )
      );
  }

  ngOnDestroy(): void {
    localStorage.removeItem('financeProduct');
  }
}
