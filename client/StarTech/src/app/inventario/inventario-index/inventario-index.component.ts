import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';
import { ImpresiónService } from '../../shared/services/impresión.service';

@Component({
  selector: 'app-inventario-index',
  templateUrl: './inventario-index.component.html',
  styleUrl: './inventario-index.component.css'
})
export class InventarioIndexComponent {

  idUsuario = '3';
  datos: any; // Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private router: Router,
    private srvReporte: ImpresiónService
  ) {
    this.listaInventarios();
  }

  // Listar todos los inventarios llamando al API
  listaInventarios() {
    this.gService.list('inventario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(data);
        // Filtrar la lista de inventarios para que incluya solo aquellos que tengan al usuario como encargado
        this.datos = data.filter((inventario: any) => {
          // Verificar si el usuario está como encargado en alguna de las bodegas del inventario
          return inventario.bodega.encargados.some((encargado: any) => encargado.usuarioId == this.idUsuario);
        });
      });
  }

  detalleInventario(idBodega: number, idProducto:number) {
    this.router.navigate(['/inventario', idProducto, idBodega]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  reporteMovimientosDiarios() {
    const encabezado = ["Bodega", "Producto", "Movimiento", "Cantidad"];
    const cuerpo = this.datos.flatMap(data =>
      data.bodega.ajusteInventario.flatMap(inventario =>
        inventario.productos.map(productos => [
          data.bodega.nombre,
          productos.producto.nombre,
          inventario.tipoMovimiento,
          productos.cantidad
        ])
      )
    );
    this.srvReporte.imprimir(encabezado, cuerpo, "Reporte de Movimientos", true);
  }
  
}
