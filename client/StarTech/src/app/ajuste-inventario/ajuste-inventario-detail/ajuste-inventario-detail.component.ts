import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from '../../share/generic.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ajuste-inventario-detail',
  templateUrl: './ajuste-inventario-detail.component.html',
  styleUrl: './ajuste-inventario-detail.component.css'
})
export class AjusteInventarioDetailComponent {
  datos:any
  destroy$:Subject<boolean>=new Subject<boolean>()

  constructor(private route: ActivatedRoute, private gService: GenericService) {
    //Obtener párametro de la URL
    let id = this.route.snapshot.paramMap.get('id');
    if(!isNaN(Number(id))){
      this.obtenerProducto(Number(id))
    }
  }
  obtenerProducto(id: any) {
    this.gService
      .get('producto',id)
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
