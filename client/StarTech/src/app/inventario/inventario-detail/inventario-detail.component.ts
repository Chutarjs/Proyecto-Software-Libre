import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from '../../share/generic.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-inventario-detail',
  templateUrl: './inventario-detail.component.html',
  styleUrl: './inventario-detail.component.css'
})
export class InventarioDetailComponent {
  datos:any
  destroy$:Subject<boolean>=new Subject<boolean>()

  constructor(private route: ActivatedRoute, private gService: GenericService) {
    //Obtener párametro de la URL
    let idBodega = this.route.snapshot.paramMap.get('idBodega');
    let idProducto = this.route.snapshot.paramMap.get('idProducto');

    if(!isNaN(Number(idProducto))){
      this.obtenerBodega(Number(idProducto))
    }
  }
  obtenerBodega(id: any) {
    this.gService
      .get('bodega',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
