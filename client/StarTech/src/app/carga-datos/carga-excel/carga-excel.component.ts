import { Component } from '@angular/core';
import { CargaExcelService } from '../../shared/services/excel.service';
import { FormControl } from '@angular/forms';
import { GenericService } from '../../share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { NotificacionService, TipoMessage } from '../../shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carga-excel',
  templateUrl: './carga-excel.component.html',
  styleUrls: ['./carga-excel.component.css']
})
export class CargaExcelComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  datosInventario: any[] = []; // Estructura para almacenar los datos del inventario
  //Respuesta del API crear/modificar
  respInventario: any;
  constructor(private cargaExcelService: CargaExcelService, 
    private gService:GenericService,
    private noti:NotificacionService,
    private router:Router) {

  }

  onFileSelected(event: any) {
    const archivoExcel = event.target.files[0];
    this.cargaExcelService.cargarDatosDesdeExcel(archivoExcel)
      .then(datos => {
        this.datosInventario = datos;
        console.log('Datos cargados desde Excel:', datos);
      })
      .catch(error => {
        console.error('Error al cargar datos desde Excel:', error);
      });
  }

  insertInventario() {
    for (let inventario of this.datosInventario) { // Cambiado de for(let inventario in this.datosInventario) a for(let inventario of this.datosInventario)
        let inventarioForm = new FormControl();

        //Asignar valor al formulario
        inventarioForm.patchValue({
            bodegas: inventario[0],
            productos: inventario[1],
            cantidadStock: inventario[2],
            cantidadMinima: inventario[3],
            cantidadMaxima: inventario[4]
        });

        console.log(inventarioForm.value);
        console.log(this.gService);
        //Accion API create enviando toda la informacion del formulario
        this.gService
            .create('inventario', inventarioForm.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                //Obtener respuesta
                this.noti.mensajeRedirect('Crear Inventario',
                    `Inventario creado`,
                    TipoMessage.success,
                    'inventario-table')
                this.router.navigate(['/inventario-table']);
            });
    }
}

}
