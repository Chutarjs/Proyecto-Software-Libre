import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';
import { NotificacionService, TipoMessage } from '../../shared/services/notification.service';

@Component({
  selector: 'app-ajuste-inventario-index',
  templateUrl: './ajuste-inventario-index.component.html',
  styleUrls: ['./ajuste-inventario-index.component.css'],
})
export class AjusteInventarioIndexComponent {

  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['id', 'fecha', 'bodega', 'usuario', 'tipoMovimiento', 'justificacion', 'totalProductos'];

  constructor(
    private gService: GenericService,
    private router: Router,
    private noti: NotificacionService
  ) {
    this.listaAjustes();
  }

  listaAjustes() {
    this.gService.list('ajuste-inventario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.datos = data;
      });
  }

  detalleAjuste(id: number) {
    this.router.navigate(['/ajuste-inventario', id]);
  }

  crearAjuste() {
    this.router.navigate(['/ajuste/create']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
