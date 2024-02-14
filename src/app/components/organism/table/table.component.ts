import { CommonModule, SlicePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { v1 as uuidv1 } from 'uuid';

import { FilterByPipe } from '@shared/pipes';

import { valueTableHeader } from '../../templates/product-view/utils';
import { TypographyComponent } from '../../atom/typography/typography.component';
import { Size } from '../../atom/typography/utils';
import { ImgComponent } from '../../atom/img/img.component';
import { MenuComponent } from '../../atom/menu/menu.component';

import { tableHeaders } from './utils';
import { MenuAction } from '../../atom/menu/utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule, TypographyComponent, ImgComponent, MenuComponent, FilterByPipe, SlicePipe],
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TableComponent {
  readonly customColumns = ['logo'];
  @Input() id = uuidv1();
  @Input() tableDescription!: string;
  @Input() tableHeaders!: tableHeaders[];
  @Input() tableContent: string[][] = [];
  @Input() searchElement!: string;
  @Input() pagination: number | undefined = undefined;
  @Output() triggerSelected = new EventEmitter<{ title: string; id: string; action: MenuAction }>();

  tableHeaderValues = valueTableHeader;
  sizeTypography = Size;

  triggerSelection(action: MenuAction, row: string[]): void {
    const title: string = row[1];
    const id: string = row[5];
    this.triggerSelected.emit({ title, id, action });
  }

}
