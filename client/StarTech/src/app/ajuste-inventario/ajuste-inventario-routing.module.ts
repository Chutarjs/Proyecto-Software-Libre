import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjusteInventarioAllComponent } from './ajuste-inventario-all/ajuste-inventario-all.component';
import { AjusteInventarioFormComponent } from './ajuste-inventario-form/ajuste-inventario-form.component';
import { AjusteInventarioDetailComponent } from './ajuste-inventario-detail/ajuste-inventario-detail.component';

const routes: Routes = [
  {
    path: 'ajuste-table',
    component: AjusteInventarioAllComponent
  },
  {
    path: 'ajuste/create',
    component: AjusteInventarioFormComponent
  },
  {
    path:'ajuste/:id',component: AjusteInventarioDetailComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjusteInventarioRoutingModule { }
