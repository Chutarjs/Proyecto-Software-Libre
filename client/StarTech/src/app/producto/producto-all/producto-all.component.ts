import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductoAllDataSource, ProductoAllItem } from './producto-all-datasource';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductoDiagComponent } from '../producto-diag/producto-diag.component';

@Component({
  selector: 'app-producto-all',
  templateUrl: './producto-all.component.html',
  styleUrl: './producto-all.component.css'
})
export class ProductoAllComponent implements AfterViewInit {
  datos: any
  destroy$: Subject<boolean>=new Subject<boolean>()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<ProductoAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'costoUnitario','acciones'];

  constructor(private gService:GenericService,
    private dialog:MatDialog){

  }

  ngAfterViewInit(): void {
    this.listaProductos()
  }

  listaProductos(){
    //localhost:3000/videojuego
    this.gService.list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
        this.dataSource = new MatTableDataSource(this.datos)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      })
  }
  detalleProducto(id:number){
    const dialogConfig=new MatDialogConfig()
    dialogConfig.disableClose=false;
    dialogConfig.width='50%'
    dialogConfig.data={
      id:id
    }
    this.dialog.open(ProductoDiagComponent,dialogConfig)
    
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
