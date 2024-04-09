import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenIndexComponent } from './orden-index/orden-index.component';
import { OrdenDetailComponent } from './orden-detail/orden-detail.component';
import { OrdenFormComponent } from './orden-form/orden-form.component';


const routes: Routes = [
  {
    path:'orden', 
    component: OrdenIndexComponent
  },
  {
    path: 'orden/create',
    component: OrdenFormComponent
  },
  {
    path:'orden/:id',component: OrdenDetailComponent
  },
  {
    path: 'orden/update/:id',
    component: OrdenFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenRoutingModule { }


