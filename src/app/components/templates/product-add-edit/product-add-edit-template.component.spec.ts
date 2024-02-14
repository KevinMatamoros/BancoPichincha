import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { FinanceProductI } from '@shared/models';
import { FinanceProductService } from '@shared/services';

import { ProductAddEditTemplateComponent } from './product-add-edit-template.component';
import { TypographyComponent } from '../../atom/typography/typography.component';
import { InputComponent } from '@molecules';
import { ButtonComponent } from '@atoms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProductAddEditComponent', () => {
  let component: ProductAddEditTemplateComponent;
  let fixture: ComponentFixture<ProductAddEditTemplateComponent>;
  let financeProductServiceSpy: jasmine.SpyObj<FinanceProductService>;

  beforeEach(async () => {
    financeProductServiceSpy = jasmine.createSpyObj('FinanceProductService', [
      'checkFinanceProduct',
      'createFinanceProduct',
    ]);
    await TestBed.configureTestingModule({
      imports: [
        TypographyComponent,
        InputComponent,
        ButtonComponent,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: FinanceProductService, useValue: financeProductServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAddEditTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  it('should call checkDateReleaseChanges when date_release changes', () => {
    component.ngOnInit();
    spyOn(component, 'checkDateReleaseChanges');
    component.form.get('date_release')?.setValue('2024-02-13');
    expect(component.checkDateReleaseChanges).toHaveBeenCalled();
  });

  it('should call checkFinanceProduct when validateId is called', fakeAsync(() => {
    financeProductServiceSpy.checkFinanceProduct.and.returnValue(of(true))
    component.ngOnInit();
    component.form.get('id')?.setValue('123');
    component.validateId();
    tick();
    expect(financeProductServiceSpy.checkFinanceProduct).toHaveBeenCalledWith({ id: '123' });
  }));

  it('should set idInvalid error when checkFinanceProduct returns true', () => {
    component.ngOnInit();
    financeProductServiceSpy.checkFinanceProduct.and.returnValue(of(true))
    component.form.get('id')?.setValue('123');
    component.validateId();
    expect(component.form.get('id')?.hasError('idInvalid')).toBeTruthy();
  });

  it('should call createFinanceProduct when saveProduct is called for a new product', () => {
    component.ngOnInit();
    financeProductServiceSpy.createFinanceProduct.and.returnValue(of({}))
    component.saveProduct();
    expect(component.financeProduct.createFinanceProduct).toHaveBeenCalled();
  });

  it('should navigate to home when saveProduct is called for a new product', () => {
    component.ngOnInit();
    spyOn(component.router, 'navigate');
    financeProductServiceSpy.createFinanceProduct.and.returnValue(of({}))
    component.saveProduct();
    expect(component.router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should reset all form controls to their default values', () => {
    component.initForm();
    component.resetForm();

    expect(component.form.get('id')?.value).toBeNull();
    expect(component.form.get('name')?.value).toBeNull();
    expect(component.form.get('description')?.value).toBeNull();
    expect(component.form.get('logo')?.value).toBeNull();
    expect(component.form.get('date_release')?.value).toBeNull();
    expect(component.form.get('date_revision')?.value).toBeNull();
  });

  it('should reset all form controls to their default values', () => {
    component.product.id = 'test';
    component.initForm();

    expect(component.form.get('date_release')?.value).toBe('2024-02-14');
    expect(component.form.get('date_revision')?.value).toBe('2024-02-14');
  });
});
