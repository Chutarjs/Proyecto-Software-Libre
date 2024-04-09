import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  cargarDatosDesdeExcel(archivo: File): void {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: ArrayBuffer = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });

      // Aquí procesaremos los datos del Excel
      this.procesarDatosExcel(workbook);
    };

    reader.readAsArrayBuffer(archivo);
  }

  private procesarDatosExcel(workbook: XLSX.WorkBook): void {
    workbook.SheetNames.forEach(sheetName => {
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const datos: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      // Iterar sobre los datos y procesar cada fila
      datos.forEach(fila => {
        // Suponiendo que tienes las columnas SKU, Nombre Producto, Nombre Bodega y Cantidad en tu archivo Excel
        const sku = fila[0]; // Columna 1 (A)
        const nombreProducto = fila[1]; // Columna 2 (B)
        const nombreBodega = fila[2]; // Columna 3 (C)
        const cantidad = fila[3]; // Columna 4 (D)
  
        // Aquí puedes implementar la lógica para verificar y crear productos y bodegas
        // También crear registros de ajuste de inventario
      });
    });
  }
}