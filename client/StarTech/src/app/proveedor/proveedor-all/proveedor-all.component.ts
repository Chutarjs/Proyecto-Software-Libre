import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProveedorDiagComponent } from '../proveedor-diag/proveedor-diag.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../share/authentication.service';

@Component({
  selector: 'app-proveedor-all',
  templateUrl: './proveedor-all.component.html',
  styleUrl: './proveedor-all.component.css'
})
export class ProveedorAllComponent implements AfterViewInit {
  datos: any;
  currentUser:any;
  isAutenticated:boolean;
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
    this.listaProveedores()
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
  listaProveedores(){
    //localhost:3000/videojuego
    this.gService.list('proveedor/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
        this.dataSource = new MatTableDataSource(this.datos)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      })
  }

  actualizarProveedor(id: number) {
    this.router.navigate(['/proveedor/update', id], {
      relativeTo: this.route,
    });
  }

  crearProveedor() {
    this.router.navigate(['/proveedor/create'], {
      relativeTo: this.route,
    });
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
