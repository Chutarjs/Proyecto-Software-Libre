import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorAllComponent } from './proveedor-all/proveedor-all.component';
import { ProveedorFormComponent } from './proveedor-form/proveedor-form.component';

const routes: Routes = [
  {
    path: 'proveedor-table',
    component: ProveedorAllComponent
  },
  {
    path: 'proveedor/create',
    component: ProveedorFormComponent
  },
  {
    path: 'proveedor/update/:id',
    component: ProveedorFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
