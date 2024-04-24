import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodegaAllComponent } from './bodega-all/bodega-all.component';
import { BodegaFormComponent } from './bodega-form/bodega-form.component';

const routes: Routes = [
  {
    path: 'bodega-table',
    component: BodegaAllComponent
  },
  {
    path: 'bodega/create',
    component: BodegaFormComponent
  },
  {
    path: 'bodega/update/:id',
    component: BodegaFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodegaRoutingModule { }
