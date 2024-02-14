import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from '@molecules';

import { TableComponent } from './table.component';
import { TypographyComponent } from '../../atom/typography/typography.component';
import { MenuAction } from '../../atom/menu/utils';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, TypographyComponent, InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const confirmSpy = spyOn(component.triggerSelected, 'emit');
    const row: string[] = ['0','1','2','3','4','5'];

    component.triggerSelection(MenuAction.EDIT ,row);
    expect(confirmSpy).toHaveBeenCalled();
  });

});
