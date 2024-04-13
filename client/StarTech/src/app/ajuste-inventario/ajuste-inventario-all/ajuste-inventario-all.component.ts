import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AjusteInventarioDetailComponent } from '../ajuste-inventario-detail/ajuste-inventario-detail.component';

@Component({
  selector: 'app-ajuste-inventario-all',
  templateUrl: './ajuste-inventario-all.component.html',
  styleUrl: './ajuste-inventario-all.component.css'
})
export class AjusteInventarioAllComponent implements AfterViewInit {
  datos: any
  destroy$: Subject<boolean>=new Subject<boolean>()
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['sku', 'nombre', 'costoUnitario','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService,
    private dialog:MatDialog){
  }

  ngAfterViewInit(): void {
    this.listaAjustes()
  }
  //Listar todos los videojuegos llamando al API
  listaAjustes(){
    //localhost:3000/videojuego
    this.gService.list('ajuste/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
        this.dataSource = new MatTableDataSource(this.datos)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      })
  }
  detalleAjuste(id:number){
    this.router.navigate(['/ajuste', id], {
      relativeTo: this.route,
    });
  }
  actualizarAjuste(id: number) {
    this.router.navigate(['/ajuste/update', id], {
      relativeTo: this.route,
    });
  }

  crearAjuste() {
    this.router.navigate(['/ajuste/create'], {
      relativeTo: this.route,
    });
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
