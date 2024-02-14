import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
4;

import { FinanceProductService, ModalService } from '@shared/services';

import { ButtonComponent, MenuAction } from '@atoms';
import { InputComponent } from '@molecules';
import { TableComponent } from '@organism';

import { ProductViewTemplateComponent } from './product-view-template.component';

describe('ProductViewTemplateComponent', () => {
  let component: ProductViewTemplateComponent;
  let fixture: ComponentFixture<ProductViewTemplateComponent>;
  let financeProductServiceSpy: jasmine.SpyObj<FinanceProductService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(waitForAsync(() => {
    financeProductServiceSpy = jasmine.createSpyObj('FinanceProductService', [
      'getFinanceProducts',
      'checkFinanceProduct',
      'createFinanceProduct',
      'deleteFinanceProduct',
    ]);

    modalServiceSpy = jasmine.createSpyObj('ModalService', ['openModal']);

    TestBed.configureTestingModule({
      imports: [
        ProductViewTemplateComponent,
        TableComponent,
        InputComponent,
        ButtonComponent,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: FinanceProductService, useValue: financeProductServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy },
        provideHttpClient(),
      ],
    }).compileComponents();

    financeProductServiceSpy.getFinanceProducts.and.returnValue(of([]));

    fixture = TestBed.createComponent(ProductViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.formView.get('search')?.value).toEqual('');
  });

  it('should navigate to "/add" route when called', () => {
    spyOn(component.router, 'navigate');
    component.addProductRedirect();
    expect(component.router.navigate).toHaveBeenCalledWith(['/add']);
  });

  it('should delete finance product on deleteProduct success', () => {
    const mockDeleteResponse = { status: 200, message: 'Deleted successfully' };
    financeProductServiceSpy.deleteFinanceProduct.and.returnValue(
      of(mockDeleteResponse)
    );

    component.deleteProduct('1');

    expect(financeProductServiceSpy.deleteFinanceProduct).toHaveBeenCalledWith({
      id: '1',
    });
    expect(component.productService.deleteFinanceProduct).toHaveBeenCalled();
  });

  it('should open modal on rowSelection and delete product on modal confirmation', () => {
    modalServiceSpy.openModal.and.returnValue(of());
    const mockRow = { title: 'Product 1', id: '1', action: MenuAction.DELETE };

    component.rowSelection(mockRow);

    expect(component.modalService.openModal).toHaveBeenCalledWith(
      component.entry,
      '¿Estas seguro de eliminar el producto Product 1?'
    );
  });

  it('should open modal on rowSelection and delete product on modal confirmation', () => {
    const mockRow = { title: 'Product 1', id: '1', action: MenuAction.EDIT };
    spyOn(component.router, 'navigate');

    component.rowSelection(mockRow);

    expect(component.router.navigate).toHaveBeenCalledWith(['/edit']);
  });

  it('should update pagination variable when a valid page number is selected', () => {
    const page = 2;
    component.selectedPage(page);
    expect(component.pagination).toEqual(page);
  });
});
