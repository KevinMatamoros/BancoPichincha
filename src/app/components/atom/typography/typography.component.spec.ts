import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypographyComponent } from './typography.component';
import { CommonModule } from '@angular/common';
import { Size } from './utils';

describe('TypographyComponent', () => {
  let component: TypographyComponent;
  let fixture: ComponentFixture<TypographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TypographyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render the component with default values', () => {
    expect(component.text).toBeUndefined();
    expect(component.size).toBe(Size.paragraph);
    expect(component.color).toBeUndefined();
  });

  it('should render the component with custom text', () => {
    component.text = 'Custom Text';
    expect(component.text).toBe('Custom Text');
    expect(component.size).toBe(Size.paragraph);
    expect(component.color).toBeUndefined();
  });

  it('should render the component with custom size', () => {
    component.size = Size.heading_1;
    expect(component.text).toBeUndefined();
    expect(component.size).toBe(Size.heading_1);
    expect(component.color).toBeUndefined();
  });

  it('should render the component with custom color when color input is provided', function() {
    component.color = 'red';
    expect(component.color).toBe('red');
  });
});
