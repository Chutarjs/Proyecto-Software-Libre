import { Component } from '@angular/core';
import { ExcelService } from './excel.service';

@Component({
  selector: 'app-carga-datos',
  templateUrl: './carga-datos.component.html',
  styleUrls: ['./carga-datos.component.css']
})
export class CargaDatosComponent {

  constructor(private excelService: ExcelService) { }

  onArchivoSeleccionado(event: any): void {
    const archivo: File = event.target.files[0];
    this.excelService.cargarDatosDesdeExcel(archivo);
  }
}