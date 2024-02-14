import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input.component';

xdescribe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InputComponent, ReactiveFormsModule ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set and get the value', () => {
    const testValue = 'Test Value';
    component.writeValue(testValue);
    expect(component.value).toEqual(testValue);
  });

  it('should render an input element with the given id, name and placeholder', () => {
    const component = fixture.componentInstance;
    component.id = 'testId';
    component.placeholder = 'testPlaceholder';
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy();
    expect(inputElement.id).toBe('testId');
    expect(inputElement.placeholder).toBe('testPlaceholder');
  });

  it('should call onTouched and onChanged functions when handleChange is called', () => {
    const component = fixture.componentInstance;
    const onTouchedSpy = jasmine.createSpy('onTouched');
    const onChangedSpy = jasmine.createSpy('onChanged');
    component.onTouched = onTouchedSpy;
    component.onChanged = onChangedSpy;
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'testValue';
    inputElement.dispatchEvent(new Event('input'));
    expect(onTouchedSpy).toHaveBeenCalled();
    expect(onChangedSpy).toHaveBeenCalledWith('testValue');
  });

});
