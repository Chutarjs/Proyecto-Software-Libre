import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../share/authentication.service';

@Component({
  selector: 'app-bodega-all',
  templateUrl: './bodega-all.component.html',
  styleUrl: './bodega-all.component.css'
})
export class BodegaAllComponent implements AfterViewInit {
  datos: any;
  isAutenticated:boolean;
  currentUser:any;
  destroy$: Subject<boolean>=new Subject<boolean>()
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'direccion', 'contacto','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService,
    private dialog:MatDialog,
    private authService: AuthenticationService){
  }

  ngAfterViewInit(): void {
    this.listaBodegas()
        //Suscripción al booleano que indica si el usuario esta autenticado
        this.authService.isAuthenticated.subscribe((valor)=>(
          this.isAutenticated=valor
        ))
        //Suscripción para acceder a la información del usuario actual
        this.authService.decodeToken.subscribe((user:any)=>(
          this.currentUser=user
        ))
  }
  //Listar todos los videojuegos llamando al API
  listaBodegas(){
    //localhost:3000/videojuego
    this.gService.list('bodega/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
        this.dataSource = new MatTableDataSource(this.datos)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      })
  }

  actualizarBodega(id: number) {
    this.router.navigate(['/bodega/update', id], {
      relativeTo: this.route,
    });
  }

  crearBodega() {
    this.router.navigate(['/bodega/create'], {
      relativeTo: this.route,
    });
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
