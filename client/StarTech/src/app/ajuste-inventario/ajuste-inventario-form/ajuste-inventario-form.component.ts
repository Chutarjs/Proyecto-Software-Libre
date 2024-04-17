import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../shared/services/notification.service';
import { FormErrorMessage } from '../../form-error-message';
import { tick } from '@angular/core/testing';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-ajuste-inventario-form',
  templateUrl: './ajuste-inventario-form.component.html',
  styleUrls: ['./ajuste-inventario-form.component.css'],
})
export class AjusteInventarioFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  today = new Date();
  fechaCreacion = new FormControl({ value: this.today, disabled: true });
  bodegas: any;
  todosProductos: any;
  usuarios: any;
  listaProductos: any;
  ordenForm: FormGroup;
  idOrden: number = 0;
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
    this.formularioReactive()
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idOrden = params['id'];
      this.fechaCreacion.setValue(this.today);
    });
    this.cargarProductos();
    this.cargarBodegas();
    this.cargarUsuarios();
  }

  formularioReactive() {
    this.ordenForm = this.fb.group({
      fechaCreacion: [null, Validators.required],
      bodega: [null, Validators.required],
      usuario: [null, Validators.required],
      justificacion: [null, Validators.required],
      productos: [null, Validators.required],
      tipoMovimiento: [null, Validators.required]
    });
  }

  cargarBodegas() {
    this.bodegas = null;
    this.gService
      .list('bodega')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.bodegas = data;
      }); 
  }

  cargarUsuarios() {
    this.usuarios = null;
    this.gService
      .list('usuario')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.usuarios = data;
      }); 
  }
  cargarProductos() {
    this.todosProductos = null;
     this.gService
      .list('producto')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.todosProductos = data;
      }); 
  }
  agregarProducto() {
    if (this.todosProductos && this.todosProductos.length > 0) {
      const productoToAdd = this.todosProductos[0]; // Getting the first product from todosProductos
      if (!this.listaProductos) {
        this.listaProductos = []; // Initialize listaProductos if it's null
      }
      productoToAdd.cantidad = 1; // Inicializar la cantidad
      const cantidadControl = new FormControl(productoToAdd.cantidad);

      this.ordenForm.addControl('cantidad_' + this.listaProductos.length, cantidadControl);
      this.listaProductos.push(productoToAdd); // Adding the product to listaProductos
    } else {
      console.log('No hay productos disponibles para agregar.');
    }
  }

  eliminarProducto() {
    if (this.listaProductos && this.listaProductos.length > 0) {
      this.listaProductos.pop(); // Remove the last product from the array
      console.log('Último producto eliminado.');
    } else {
      console.log('No hay productos en la lista para eliminar.');
    }
  }

  cambiarProductoSeleccionado(i, prod){
    for(var productoKey in this.listaProductos){
      var producto = this.listaProductos[productoKey];
      if(producto.nombre == prod.nombre){
        this.noti.mensajeRedirect('Añadir producto', 
        `Ese producto ya fue añadido`, 
        TipoMessage.warning,
        'orden/create')
      }
      this.listaProductos[i] = prod;
    }
  }

  submitOrden(): void {
    this.ordenForm.get('fechaCreacion').setValue(this.today);
    for (let i = 0; i < this.listaProductos.length; i++) {
      this.listaProductos[i].cantidad = this.ordenForm.get('cantidad_'+i.toString()).value;
    }
    let productosForm = this.listaProductos;
    this.ordenForm.patchValue({ productos: productosForm });

    console.log(this.ordenForm);

    if (this.isCreate) {
      this.gService
        .create('ajuste', this.ordenForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.noti.mensajeRedirect('Crear Ajuste de Inventario', 
            `Ajuste de Inventario creado: ${data.id}`,
            TipoMessage.success,
            'ajuste'
          );
          this.router.navigate(['/ajuste']); 
        }); 
    }
  }

  onReset() {
    this.ordenForm.reset();
  }

  onBack() {
    this.router.navigate(['/ajuste-inventario']); 
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
