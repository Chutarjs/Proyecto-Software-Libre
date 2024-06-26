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
  selector: 'app-orden-form',
  templateUrl: './orden-form.component.html',
  styleUrls: ['./orden-form.component.css'],
})
export class OrdenFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //fecha
  today = new Date();
  fechaCreacion = new FormControl({value: this.today, disabled: true});
  //Lista de proveedores
  proveedores: any;
  //Lista de bodegas
  bodegas: any;
  //Lista de usuarios
  usuarios: any;
  //todos los productos
  todosProductos: any;
  //productos seleccionados
  listaProductos: any;
  //total
  total: any;
  //Orden a actualizar 
  ordenInfo: any;
  //Respuesta del API crear/modificar
  respOrden: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  ordenForm: FormGroup;
  //id del orden
  idOrden: number = 0;
  //Sí es crear
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private activeRouter: ActivatedRoute,
    private gService:GenericService,
    private noti:NotificacionService
  ) {
    this.formularioReactive()
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idOrden=params['id']
        this.fechaCreacion.setValue(this.today);
    })
    this.cargarProductos();
    this.cargarProveedores();
    this.cargarBodegas();
    this.cargarUsuarios();
  }
  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.ordenForm=this.fb.group({
      fechaCreacion: [null,Validators.required],
      proveedor:[null,Validators.required],
      bodega: [null,Validators.required],
      usuario: [null,Validators.required],
      productos: [null, Validators.required],
      total: [null, null]
    })
  }
  agregarProducto() {
    // Assuming you want to add the first product from todosProductos to listaProductos
    if (this.todosProductos && this.todosProductos.length > 0) {
      const productoToAdd = this.todosProductos[0]; // Getting the first product from todosProductos
    if (!this.listaProductos) {
      this.listaProductos = []; // Initialize listaProductos if it's null
    }
      productoToAdd.cantidad = 1; // Inicializar la cantidad
      productoToAdd.subtotal = productoToAdd.cantidad * productoToAdd.costoUnitario;
      const cantidadControl = new FormControl(productoToAdd.cantidad);
      const subtotal = new FormControl((productoToAdd.cantidad*productoToAdd.costoUnitario));

      this.ordenForm.addControl('cantidad_' + this.listaProductos.length, cantidadControl);
      this.ordenForm.addControl('subtotal_' + this.listaProductos.length, subtotal);
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
  cambiarCantidad(i) {
    console.log("i:" + i)
    const cantidad = this.ordenForm.get('cantidad_'+i).value; 
    this.ordenForm.get('subtotal_'+i).setValue(cantidad*this.listaProductos[i].costoUnitario);
    this.cambiarTotal();
  }
  cambiarTotal() {
    var total = 0;
    for(let product in this.listaProductos)
    {
      console.log(product);
      console.log(this.ordenForm);
      total += this.ordenForm.get('subtotal_'+product).value;
    }
    console.log(this.ordenForm.get('total'));
    this.ordenForm.get('total').setValue(total);
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
    }
    this.listaProductos[i] = prod; // Adding the product to listaProductos
    this.cambiarCantidad(i);
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
    cargarProveedores() {
    this.proveedores = null;
     this.gService
      .list('proveedor')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.proveedores = data;
      }); 
  }  
  cargarUsuarios() {
    this.usuarios = null;
     this.gService
      .list('usuario')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.usuarios = data;
      }); 
  }      
  cargarBodegas() {
    this.bodegas = null;
     this.gService
      .list('bodega')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.bodegas = data;
      }); 
  }  
  public errorHandling = (controlName: string) => {
    let messageError=''
    const control = this.ordenForm.get(controlName);
    if(control.errors){
      for (const message of FormErrorMessage) {
        console.log(message)
        if (control &&
            control.errors[message.forValidator] &&
            message.forControl==controlName) {
              messageError = message.text;
        }
      }
      return messageError
    }else{
      return false
    }
  };
  
  submitOrden(): void {
    //Establecer submit verdadero
    this.ordenForm.get('fechaCreacion').setValue(this.today)
    for (let i = 0; i < this.listaProductos.length; i++) {
      this.listaProductos[i].cantidad = this.ordenForm.get('cantidad_'+i.toString()).value
  }
  
    let productosForm=this.listaProductos

    this.ordenForm.patchValue({productos:productosForm})
    this.submitted = true;
    //Verificar validación
    if (this.ordenForm.invalid) {
      console.log(this.ordenForm)
      return;
    }

    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let proveedorForm=this.ordenForm.get('proveedor').value
    let bodegaForm=this.ordenForm.get('bodega').value
    let usuarioForm=this.ordenForm.get('usuario').value
    //Asignar valor al formulario
    //setValue
    this.ordenForm.patchValue({proveedores:proveedorForm})
    this.ordenForm.patchValue({bodegas:bodegaForm})
    this.ordenForm.patchValue({usuarios:usuarioForm})
    this.ordenForm.patchValue({productos:productosForm})
    
    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      console.log(this.ordenForm)
      this.gService
        .create('orden', this.ordenForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respOrden = data;
          this.noti.mensajeRedirect('Crear Orden', 
          `Orden creado: ${data.id}`,
          TipoMessage.success,
          'orden')
           this.router.navigate(['/orden']); 
        }); 
    }
  }
  
  onReset() {
    this.submitted = false;
    this.ordenForm.reset();
  }
  onBack() {
    this.router.navigate(['/orden']); 
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
