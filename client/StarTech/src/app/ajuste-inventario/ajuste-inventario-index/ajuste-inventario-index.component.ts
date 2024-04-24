import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';
import { NotificacionService, TipoMessage } from '../../shared/services/notification.service';
import { AuthenticationService } from '../../share/authentication.service';

@Component({
  selector: 'app-ajuste-inventario-index',
  templateUrl: './ajuste-inventario-index.component.html',
  styleUrls: ['./ajuste-inventario-index.component.css'],
})
export class AjusteInventarioIndexComponent {
  currentUser:any;
  isAutenticated:boolean;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['id', 'fecha', 'bodega', 'usuario', 'tipoMovimiento', 'justificacion', 'totalProductos'];

  constructor(
    private gService: GenericService,
    private router: Router,
    private noti: NotificacionService,
    private authService: AuthenticationService
  ) {
    //Suscripción al booleano que indica si el usuario esta autenticado
    this.authService.isAuthenticated.subscribe((valor)=>(
      this.isAutenticated=valor
    ))
    //Suscripción para acceder a la información del usuario actual
    this.authService.decodeToken.subscribe((user:any)=>(
      this.currentUser=user
    ))
    this.listaAjustes();
  }

  listaAjustes() {
    this.gService.list('ajuste/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.datos = data;
        console.log(this.datos);
      });
  }

  detalleAjuste(id: number) {
    this.router.navigate(['/ajuste', id]);
  }

  crearAjuste() {
    this.router.navigate(['/ajuste/create']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
