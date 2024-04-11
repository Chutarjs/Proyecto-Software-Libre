//Este componente contendrá la lógica para manejar la carga de archivos Excel desde la interfaz de usuario

import { Component } from '@angular/core';
import { CargaExcelService } from '../../excel.service';

@Component({
  selector: 'app-carga-excel',
  templateUrl: './carga-excel.component.html',
  styleUrls: ['./carga-excel.component.css']
})
export class CargaExcelComponent {
  constructor(private cargaExcelService: CargaExcelService) {}

  onFileSelected(event: any) {
      const archivoExcel = event.target.files[0];
      this.cargaExcelService.cargarDatosDesdeExcel(archivoExcel)
          .subscribe(
              response => {
                  console.log('Datos del inventario cargados con éxito:', response);
              },
              error => {
                  console.error('Error al cargar datos desde Excel:', error);
              }
          );
  }
}