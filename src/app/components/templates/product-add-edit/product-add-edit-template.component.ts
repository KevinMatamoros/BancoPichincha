import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription, take } from 'rxjs';

import { FinanceProductService } from '@shared/services';
import { FinanceProduct } from '@shared/models';

import { TypographyComponent } from '../../atom/typography/typography.component';
import { Size } from '../../atom/typography/utils';
import { ButtonComponent } from '../../atom/button/button.component';
import { InputComponent } from '../../molecules/input/input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ProductAddEditTemplate',
  templateUrl: './product-add-edit-template.component.html',
  styleUrls: ['./product-add-edit-template.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TypographyComponent,
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductAddEditTemplateComponent implements OnInit, OnDestroy {
  @Input() product: FinanceProduct = new FinanceProduct();

  fb = inject(FormBuilder);
  financeProduct = inject(FinanceProductService);
  router = inject(Router);

  form!: FormGroup;
  size = Size;
  min!: string;

  subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.initForm();
    this.subForm();
    this.min = new Date().toLocaleDateString('en-CA');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initForm(): void {
    this.form = this.fb.group({
      id: new FormControl(this.product.id, [Validators.required]),
      name: new FormControl(this.product.name, [Validators.required]),
      description: new FormControl(this.product.description, [
        Validators.required,
      ]),
      logo: new FormControl(this.product.logo, [Validators.required]),
      date_release: new FormControl(
        this.product.id
          ? this.product.date_release.toLocaleDateString('en-CA')
          : '',
        [Validators.required]
      ),
      date_revision: new FormControl(
        {
          value: this.product.id
            ? this.product.date_revision.toLocaleDateString('en-CA')
            : '',
          disabled: true,
        },
        [Validators.required]
      ),
    });
  }

  subForm(): void {
    const dateReleaseChange = this.form
      .get('date_release')
      ?.valueChanges.subscribe((changes) =>
        this.checkDateReleaseChanges(changes)
      );
    this.subscriptions.add(dateReleaseChange);
  }

  checkDateReleaseChanges(date: string | null): void {
    if (date) {
      let dateRevision = new Date(date);
      dateRevision.setFullYear(dateRevision.getFullYear() + 1);
      this.form
        .get('date_revision')
        ?.setValue(dateRevision.toLocaleDateString('en-CA'));
    }
  }

  validateId(): void {
    const id = this.form.get('id')?.value;
    if (id) {
      const validation = this.financeProduct
        .checkFinanceProduct({ id })
        .subscribe((isInvalid: boolean) => {
          const control = this.form.get('id');
          if (isInvalid) {
            control?.setErrors({ idInvalid: true });
          } else {
            control?.setErrors(null);
          }
        });
      this.subscriptions.add(validation);
    }
  }

  resetForm(): void {
    this.form.reset();
  }

  saveProduct(): void {
    const product = this.form.getRawValue();

    if (!this.product.id) {
      // New product
      this.financeProduct
        .createFinanceProduct(product)
        .pipe(take(1))
        .subscribe(() => this.navigateHome());
    } else {
      // Edit product
      this.financeProduct
        .editFinanceProduct(product)
        .pipe(take(1))
        .subscribe(() => this.navigateHome());
    }
  }

  navigateHome(): void {
    this.router.navigate(['']);
  }
}
