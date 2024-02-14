import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, catchError, map, of } from 'rxjs';

import { ButtonComponent, MenuAction } from '@atoms';
import { InputComponent, PaginatorComponent } from '@molecules';
import { TableComponent } from '@organism';

import { FinanceProductI, TableItem } from '@shared/models';
import { FinanceProductService, ModalService } from '@shared/services';

import { defaultTableHeaders } from './utils';

@Component({
  selector: 'ProductViewTemplate',
  templateUrl: './product-view-template.component.html',
  styleUrls: ['./product-view-template.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    InputComponent,
    ButtonComponent,
    PaginatorComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductViewTemplateComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);

  productService = inject(FinanceProductService);
  modalService = inject(ModalService);

  products!: string[][];
  formView!: FormGroup;
  tableHeaders = defaultTableHeaders;
  pagination!: number | undefined;

  subscription = new Subscription();
  @ViewChild('modal', { read: ViewContainerRef }) entry!: ViewContainerRef;

  get searchElement(): string {
    return this.formView.get('search')?.value;
  }

  ngOnInit(): void {
    this.initForm();
    this.initSubs();
  }

  initForm(): void {
    this.formView = this.fb.group({
      search: new FormControl(''),
    });
  }

  initSubs(): void {
    this.getFinanceProducts();
  }

  getFinanceProducts(): void {
    const productsSub = this.productService
      .getFinanceProducts()
      .pipe(map((element: FinanceProductI[]) => TableItem.adapt(element)))
      .subscribe((res) => (this.products = res.items));
    this.subscription.add(productsSub);
  }

  addProductRedirect(): void {
    this.router.navigate(['/add']);
  }

  deleteProduct(id: string): void {
    const deleteEndpoint = this.productService
      .deleteFinanceProduct({ id })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 200) {
            return of({ status: error.status, message: error.error.text });
          }
          return of({ status: error.status, message: error.error.text });
        })
      )
      .subscribe((response: { status: number; message: string }) => {
        if (response.status === 200) this.getFinanceProducts();
      });
    this.subscription.add(deleteEndpoint);
  }

  rowSelection(row: { title: string; id: string; action: MenuAction }): void {
    if (row.action === MenuAction.DELETE) {
      const modalSub = this.modalService
        .openModal(
          this.entry,
          `¿Estas seguro de eliminar el producto ${row.title}?`
        )
        .subscribe(() => {
          this.deleteProduct(row.id);
        });
      this.subscription.add(modalSub);
    }
    if (row.action === MenuAction.EDIT) {
      const financeProduct = this.products.find(
        (element) => element[5] === row.id
      );
      localStorage.setItem('financeProduct', JSON.stringify(financeProduct));
      this.router.navigate(['/edit']);
    }
  }

  selectedPage(page: number | undefined): void {
    this.pagination = page;
  }
}
