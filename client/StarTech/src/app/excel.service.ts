//
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CargaExcelService {
    private apiUrl = 'http://localhost:3000/api/excel';

    constructor(private http: HttpClient) {}

    cargarDatosDesdeExcel(archivoExcel: File) {
        const formData = new FormData();
        formData.append('archivoExcel', archivoExcel);

        return this.http.post<any>(`${this.apiUrl}/cargar-excel`, formData);
    }
}
