import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from '../../share/generic.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-orden-detail',
  templateUrl: './orden-detail.component.html',
  styleUrl: './orden-detail.component.css'
})
export class OrdenDetailComponent {
  datos:any
  destroy$:Subject<boolean>=new Subject<boolean>()

  constructor(private route: ActivatedRoute, private gService: GenericService) {
    //Obtener párametro de la URL
    let id = this.route.snapshot.paramMap.get('id');
    if(!isNaN(Number(id))){
      this.obtenerOrden(Number(id))
    }
  }
  obtenerOrden(id: any) {
    this.gService
      .get('orden',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }
  calcularTotal(productos: any[]): number {
    let total = 0;
    for (let producto of productos) {
      total += producto.cantidad * producto.producto.costoUnitario;
    }
    return total;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
