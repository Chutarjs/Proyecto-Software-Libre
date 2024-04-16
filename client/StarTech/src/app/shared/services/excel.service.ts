import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class CargaExcelService {

  constructor(private http: HttpClient) {}

  cargarDatosDesdeExcel(archivoExcel: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0]; // Suponiendo que solo hay una hoja en el libro de trabajo
        const worksheet = workbook.Sheets[sheetName];
        const datos = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        resolve(datos);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(archivoExcel);
    });
  }
}
