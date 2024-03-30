import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorAllComponent } from './proveedor-all/proveedor-all.component';

const routes: Routes = [
  {
    path: 'proveedor-table',
    component: ProveedorAllComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
