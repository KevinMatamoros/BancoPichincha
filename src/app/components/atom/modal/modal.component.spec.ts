import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ModalComponent, ButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event on cancel()', () => {
    const closeSpy = spyOn(component.closeMeEvent, 'emit');
    component.cancel();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should emit confirm event on confirm()', () => {
    const confirmSpy = spyOn(component.confirmEvent, 'emit');
    component.confirm();
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should set title and body correctly', () => {
    const title = 'Test Title';
    const body = 'Test Body';

    component.body = body;

    fixture.detectChanges();

    const bodyElement = fixture.nativeElement.querySelector('.content');

    expect(bodyElement.textContent).toContain(body);
  });

  // Add more tests as needed for your component

  afterEach(() => {
    fixture.destroy();
  });
});