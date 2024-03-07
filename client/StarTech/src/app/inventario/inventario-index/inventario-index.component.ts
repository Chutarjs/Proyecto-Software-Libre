import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario-index',
  templateUrl: './inventario-index.component.html',
  styleUrl: './inventario-index.component.css'
})
export class InventarioIndexComponent {

  //idUsuario=2
  datos: any //Respuesta del API
  destroy$:Subject<boolean>=new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private router: Router
    )
    {
    this.listaInventarios()
  }
  //Listar todos los videojuegos llamando al API
  listaInventarios(){
    //localhost:3000/videojuego
    this.gService.list('inventario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
      })
  }
  detalleInventario(id:number){
    this.router.navigate(['/inventario',id])
  }

  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
