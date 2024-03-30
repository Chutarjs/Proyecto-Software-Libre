import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../shared/services/notification.service';
import { FormErrorMessage } from '../../form-error-message';

@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.component.html',
  styleUrls: ['./inventario-form.component.css'],
})
export class InventarioFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Lista de bodegas
  bodegasList: any;
  //Lista de productos
  productosList: any;
  //Inventario a actualizar
  InventarioInfo: any;
  //Respuesta del API crear/modificar
  respInventario: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  inventarioForm: FormGroup;
  //id de la bodega
  idBodega: number = 0;
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
    this.listaBodegas()
    this.listaProductos()
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idBodega=params['bodegaId']
      if(this.idBodega != undefined){
        this.isCreate=false
        this.titleForm='Actualizar'
        //Obtener videojuego a actualizar del API
        this.gService
          .get('inventario', this.idBodega)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data)=>{
            console.log(data)
            this.InventarioInfo=data
            //Establecer valores a precargar en el formulario
            this.inventarioForm.setValue({
              bodega: this.InventarioInfo.bodega.map(({id})=>id),
              productos: this.InventarioInfo.producto.map(({id})=>id)
            })
          })
          //[{id:5, nombre: valor, ..}]
          //[5,4]
      }
    })
  }
  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.inventarioForm=this.fb.group({
      bodegas: [null,Validators.required],
      productos: [null, Validators.required]      
    })
  }
  listaBodegas() {
    this.bodegasList = null;
     this.gService
      .list('bodega')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.bodegasList = data;
      }); 
  }  
  listaProductos() {
    this.productosList = null;
     this.gService
      .list('producto')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.productosList = data;
      }); 
  }

  public errorHandling = (controlName: string) => {
    let messageError=''
    const control = this.inventarioForm.get(controlName);
    console.log(control.errors)
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
  
  submitInventario(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.inventarioForm.invalid) {
      return;
    }
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let categoriasForm=this.inventarioForm.get('bodegas').value
                    .map((x:any)=>({ ['id']:x }))
    let subcategoriasForm=this.inventarioForm.get('productos').value
                    .map((x:any)=>({ ['id']:x }))
                    
    //Asignar valor al formulario
    //setValue
    this.inventarioForm.patchValue({categorias:categoriasForm})
    this.inventarioForm.patchValue({subcategorias:subcategoriasForm})
    console.log(this.inventarioForm.value);
  
    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
       this.gService
        .create('inventario', this.inventarioForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respInventario = data;
          this.noti.mensajeRedirect('Crear Inventario', 
          `Inventario creado: ${data.nombre}`,
          TipoMessage.success,
          'inventario-table')
           this.router.navigate(['/inventario-table']); 
        }); 
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
       this.gService
        .update('inventario', this.inventarioForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respInventario = data;
          
          this.noti.mensajeRedirect('Actualizar Inventario', 
          `Inventario actualizado: ${data.nombre}`,
          TipoMessage.success,
          'inventario-table')
           this.router.navigate(['/inventario-table']); 
        }); 
    }
  }
  
  onReset() {
    this.submitted = false;
    this.inventarioForm.reset();
  }
  onBack() {
    this.router.navigate(['/inventario-table']); 
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
