import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/product-view/product-view-routing.module').then(m => m.product_view_routes)
  },
  {
    path: 'add',
    loadChildren: () => import('./modules/product-add/product-add-routing.module').then(m => m.product_add_routes)
  },
  {
    path: 'edit',
    loadChildren: () => import('./modules/product-edit/product-edit-routing.module').then(m => m.product_edit_routes)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
