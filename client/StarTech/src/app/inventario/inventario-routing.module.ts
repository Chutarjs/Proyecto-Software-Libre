import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioIndexComponent } from './inventario-index/inventario-index.component';
import { InventarioDetailComponent } from './inventario-detail/inventario-detail.component';
import { InventarioAllComponent } from './inventario-all/inventario-all.component';

const routes: Routes = [
  {
    path:'inventario', 
    component: InventarioIndexComponent
  },
  {
    path: 'inventario-table',
    component: InventarioAllComponent
  },
  {
    path:'inventario/:id',component: InventarioDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
