import { Component } from '@angular/core';
import { CargaExcelService } from './excel.service';

@Component({
  selector: 'app-carga-datos',
  templateUrl: './carga-datos.component.html',
  styleUrls: ['./carga-datos.component.css']
})
export class CargaDatosComponent {

  constructor(private excelService: CargaExcelService) { }

  onArchivoSeleccionado(event: any): void {
    const archivo: File = event.target.files[0];
    this.excelService.cargarDatosDesdeExcel(archivo);
  }
}