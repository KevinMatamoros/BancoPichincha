import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TableComponent } from '@organism';

import { ProductAddPageComponent } from './product-add-page.component';

describe('ProductViewPageComponent', () => {
  let component: ProductAddPageComponent;
  let fixture: ComponentFixture<ProductAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductAddPageComponent, TableComponent, HttpClientModule ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
