import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrl: './producto-index.component.css'
})
export class ProductoIndexComponent {

  //idUsuario=2
  datos: any //Respuesta del API
  destroy$:Subject<boolean>=new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private router: Router
    )
    {
    this.listaProductos()
  }
  //Listar todos los videojuegos llamando al API
  listaProductos(){
    //localhost:3000/videojuego
    this.gService.list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
      })
  }
  detalleProducto(id:number){
    this.router.navigate(['/producto',id])
  }

  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
