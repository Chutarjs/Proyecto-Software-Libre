import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrl: './user-all.component.css'
})
export class UserAllComponent implements AfterViewInit {
  datos: any
  destroy$: Subject<boolean>=new Subject<boolean>()
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'id', 'rol','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService,
    private dialog:MatDialog){
  }

  ngAfterViewInit(): void {
    this.listaUsuarios()
  }
  //Listar todos los videojuegos llamando al API
  listaUsuarios(){
    //localhost:3000/videojuego
    this.gService.list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
        this.dataSource = new MatTableDataSource(this.datos)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }

  actualizarUsuario(id: number) {
    this.router.navigate(['/user/update', id], {
      relativeTo: this.route,
    });
  }

  crearUsuario() {
    this.router.navigate(['/user/create'], {
      relativeTo: this.route,
    });
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
