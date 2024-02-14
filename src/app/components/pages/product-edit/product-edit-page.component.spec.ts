import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditPageComponent } from './product-edit-page.component';
import { ProductAddEditTemplateComponent } from '../../templates/product-add-edit/product-add-edit-template.component';
import { provideHttpClient } from '@angular/common/http';

describe('ProductEditComponent', () => {
  let component: ProductEditPageComponent;
  let fixture: ComponentFixture<ProductEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductEditPageComponent, ProductAddEditTemplateComponent ],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
