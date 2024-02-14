import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MenuAction } from './utils';

@Component({
  selector: 'MenuDot',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MenuComponent {
  @Output() optionSelected = new EventEmitter<number>();

  showMenu = false;
  actionsMenu = MenuAction;

  selectAction(option: number): void {
    this.showMenu = !this.showMenu;
    this.optionSelected.emit(option);
  }
}
