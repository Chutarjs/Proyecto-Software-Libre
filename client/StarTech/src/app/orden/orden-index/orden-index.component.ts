import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';
import { NotificacionService, TipoMessage } from '../../shared/services/notification.service';

@Component({
  selector: 'app-orden-index',
  templateUrl: './orden-index.component.html',
  styleUrl: './orden-index.component.css',
})
export class OrdenIndexComponent  {

  //idUsuario=2
  datos: any //Respuesta del API
  destroy$:Subject<boolean>=new Subject<boolean>();
  displayedColumns: string[] = ['id', 'fechaGeneracion', 'fechaRecibida']

  constructor(
    private gService: GenericService,
    private router: Router,
    private noti:NotificacionService
    )
    {
      
    this.listaOrdenes()
  }
  //Listar todos los videojuegos llamando al API
  listaOrdenes(){
    //localhost:3000/orden
    this.gService.list('orden/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        this.datos=data
      })
  }

// Dentro del componente.ts
calcularTotal(productos: any[]): number {
  let total = 0;
  for (let producto of productos) {
    total += producto.cantidad * producto.producto.costoUnitario;
  }
  return total;
}


  detalleOrden(id:number){
    this.router.navigate(['/orden',id])
  }

  recibirOrden(param:any) {
    console.log(param);
    const request = param; // Create an object with the order ID
    this.gService
      .update('orden', request) // Pass the request object
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          //Obtener respuesta
          this.noti.mensajeRedirect(
            'Crear Orden', 
            `Orden recibida: ${data.id}`,
            TipoMessage.success,
            'orden'
          );
          this.router.navigate(['/orden', data.id]); 
        },
        (error) => {
          // Handle error if needed
          console.error("Error receiving order:", error);
        }
      ); 
  }
  

  crearOrden(){
    this.router.navigate(['/orden/create'])
  }
  
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

}
