import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargaDatosRoutingModule } from './carga-datos-routing.module';
import { CargaExcelComponent } from './carga-excel/carga-excel.component';


@NgModule({
  declarations: [
    CargaExcelComponent
  ],
  imports: [
    CommonModule,
    CargaDatosRoutingModule
  ],
  exports: [
    CargaExcelComponent
  ]
})
export class CargaDatosModule { }
