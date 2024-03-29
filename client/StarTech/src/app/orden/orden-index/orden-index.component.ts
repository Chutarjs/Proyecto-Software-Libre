import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';

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
        console.log(data)
        this.datos=data
      })
  }

// Dentro del componente.ts
calcularTotal(productos: any[]): number {
  let total = 0;
  for (let producto of productos) {
    total += producto.cantidad * producto.producto.costoUnitario;
    console.log(total);
  }
  return total;
}


  detalleOrden(id:number){
    this.router.navigate(['/orden',id])
  }

  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

}
