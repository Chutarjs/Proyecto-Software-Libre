import { Component } from '@angular/core';
import { ExcelService } from '../../excel.service';

@Component({
  selector: 'app-carga-excel',
  templateUrl: './carga-excel.component.html',
  styleUrls: ['./carga-excel.component.css']
})
export class CargaExcelComponent {

  constructor(private excelService: ExcelService) { }

  onArchivoSeleccionado(event: any): void {
    const archivo: File = event.target.files[0];
    this.excelService.cargarDatosDesdeExcel(archivo);
  }
}
