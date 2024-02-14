import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ProductViewPageComponent } from '@pages';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  standalone: true,
  imports: [
    ProductViewPageComponent
  ],
})
export class ProductViewComponent implements OnInit {
  fb = inject(FormBuilder);

  tableHeaders = ['name', 'lastname'];
  tableContent = [
    {
      name: 'Kevin',
      lastname: 'Matamoros',
    },
    {
      name: 'Kevin',
      lastname: 'Matamoros',
    },
    {
      name: 'Kevin',
      lastname: 'Matamoros',
    },
    {
      name: 'Kevin',
      lastname: 'Matamoros',
    },
  ];
  formView!: FormGroup;

  ngOnInit(): void {
    this.formView = this.fb.group({
      search: new FormControl(''),
    });
    this.formView.valueChanges.subscribe(c => console.log(c));
  }
}
