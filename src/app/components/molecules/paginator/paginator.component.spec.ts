import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PaginatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the correct value when selectPagination is called with a valid event target value', () => {
    const component = new PaginatorComponent();
    const event = { target: { value: '5' } };
    let emittedValue: number | undefined;
    component.paginationTrigger.subscribe((value) => {
      emittedValue = value;
    });
    component.selectPagination(event);
    expect(emittedValue).toEqual(5);
  });
});
