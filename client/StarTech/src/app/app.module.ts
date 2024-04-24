import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { ToastrModule } from 'ngx-toastr';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { BodegaModule } from './bodega/bodega.module';
import { ProductoModule } from './producto/producto.module';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InventarioModule } from './inventario/inventario.module';
import { OrdenModule } from './orden/orden.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { CargaDatosModule } from './carga-datos/carga-datos.module';
import { AjusteInventarioModule } from './ajuste-inventario/ajuste-inventario.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // importar los módulos creados propios en orden 
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    ProductoModule,
    BodegaModule,
    InventarioModule,
    OrdenModule,
    ProveedorModule,
    CargaDatosModule,
    AjusteInventarioModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    // al final el gestor de las rutas principal
    AppRoutingModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true
      }
  ],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule { }
