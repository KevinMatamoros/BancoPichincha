import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TableComponent } from '@organism';

import { ProductViewPageComponent } from './product-view-page.component';

describe('ProductViewPageComponent', () => {
  let component: ProductViewPageComponent;
  let fixture: ComponentFixture<ProductViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductViewPageComponent, TableComponent, HttpClientModule ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
