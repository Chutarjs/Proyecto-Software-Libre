import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargaExcelComponent } from './carga-excel/carga-excel.component';

const routes: Routes = [
  {
    path:'cargaExcel', 
    component: CargaExcelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaDatosRoutingModule { }
