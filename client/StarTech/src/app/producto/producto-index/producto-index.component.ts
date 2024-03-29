import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';
import { ImpresiónService } from '../../shared/services/impresión.service';

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
    private router: Router,
    private srvReporte: ImpresiónService
    )
    {
    this.listaProductos()
  }
  actualizarProducto(id: number) {
    // this.router.navigate(['/producto/update', id], {
    //   relativeTo: this.route,
    // });
  }

  crearProducto() {
    // this.router.navigate(['/videojuego/create'], {
    //   relativeTo: this.route,
    // });
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
  reporteProductos(){
    const encabezado = ["ID", "SKU", "Nombre", "Categoria", "Subcategoria", "Cantidad en Stock", "Estado"];
    const cuerpo = this.datos.map(producto => [producto.id, producto.sku, producto.nombre, producto.subcategoria.categoria.nombre, producto.subcategoria.nombre, producto.cantidadStock, producto.estado]);
    this.srvReporte.imprimir(encabezado, cuerpo, "Reporte de Productos", true);
  }

  reporteProductosCorrectos(){
    const encabezado = ["ID", "SKU", "Nombre", "Cantidad en Stock", "Estado"];
    const cuerpo = this.datos
    .filter(producto => producto.estado == 'Correcto')
    .map(producto => [producto.id, producto.sku, producto.nombre, producto.cantidadStock, producto.estado]);
    this.srvReporte.imprimirTabla(encabezado, cuerpo, "Reporte de Productos Correctos de Stock", true);
  }
  
  reporteProductosFalta(){
    const encabezado = ["ID", "SKU", "Nombre", "Cantidad en Stock", "Estado"];
    const cuerpo = this.datos
    .filter(producto => producto.estado == 'Falta Stock')
    .map(producto => [producto.id, producto.sku, producto.nombre, producto.cantidadStock, producto.estado]);
  
    this.srvReporte.imprimirTabla(encabezado, cuerpo, "Reporte de Productos Faltantes de Stock", true);
  }

  reporteProductosExcede(){
    const encabezado = ["ID", "SKU", "Nombre", "Cantidad en Stock", "Estado"];
    const cuerpo = this.datos
    .filter(producto => producto.estado == 'Excede')
    .map(producto => [producto.id, producto.sku, producto.nombre, producto.cantidadStock, producto.estado]);
    this.srvReporte.imprimirTabla(encabezado, cuerpo, "Reporte de Productos Excedidos en Stock", true);
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
