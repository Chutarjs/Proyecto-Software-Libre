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
    let id = this.route.snapshot.paramMap.get('id');
    if(!isNaN(Number(id))){
      this.obtenerBodega(Number(id))
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
