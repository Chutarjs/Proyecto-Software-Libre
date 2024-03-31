import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InventarioDiagComponent } from '../inventario-diag/inventario-diag.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventario-all',
  templateUrl: './inventario-all.component.html',
  styleUrl: './inventario-all.component.css'
})
export class InventarioAllComponent implements AfterViewInit {
  datos: any
  destroy$: Subject<boolean>=new Subject<boolean>()
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['bodega','producto','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService,
    private dialog:MatDialog){
  }

  ngAfterViewInit(): void {
    this.listaBodegas()
  }
  //Listar todos los videojuegos llamando al API
  listaBodegas(){
    //localhost:3000/videojuego
    this.gService.list('inventario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
        this.dataSource = new MatTableDataSource(this.datos)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      })
  }
  detalleBodega(id:number){
    const dialogConfig=new MatDialogConfig()
    dialogConfig.disableClose=false;
    dialogConfig.width='50%'
    dialogConfig.data={
      id:id
    }
    this.dialog.open(InventarioDiagComponent,dialogConfig)
    
  }
  actualizarInventario(idProducto: number, idBodega: number) {
    this.router.navigate(['/inventario/update', idBodega, idProducto], {
      relativeTo: this.route,
    });
  }

  crearInventario() {
    this.router.navigate(['/inventario/create'], {
      relativeTo: this.route,
    });
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
