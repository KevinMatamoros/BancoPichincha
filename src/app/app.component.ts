import { Component } from '@angular/core';
import { Size } from './components/atom/typography/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BANCO PICHINCHA';
  size = Size;
}
