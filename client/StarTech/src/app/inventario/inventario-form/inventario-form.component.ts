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
  //id del producto
  idProducto: number = 0;
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
      this.idBodega=params['idBodega']
      this.idProducto=params['idProducto']
      if(this.idBodega != undefined && this.idProducto != undefined){
        this.isCreate=false
        this.titleForm='Actualizar'
        let filtro = this.idBodega + '/' + this.idProducto
        //Obtener inventario a actualizar del API
        this.gService
          .get('inventario', filtro)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data)=>{
            this.InventarioInfo=data
            console.log(this.InventarioInfo[0])
            //Establecer valores a precargar en el formulario
            this.inventarioForm.setValue({
              cantidadMinima: this.InventarioInfo[0].cantidadMinima,
              cantidadMaxima: this.InventarioInfo[0].cantidadMaxima,
              cantidadStock: this.InventarioInfo[0].cantidadStock,
              bodegas: this.InventarioInfo[0].bodegaId,
              productos: this.InventarioInfo[0].producto.id,
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
      productos: [null, Validators.required] ,
      cantidadStock: [null, Validators.required],
      cantidadMinima: [null, Validators.required],
      cantidadMaxima: [null, Validators.required]     
    })
  }
  listaBodegas() {
    this.bodegasList = null;
     this.gService
      .list('bodega')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.bodegasList = data;
      }); 
  }  
  listaProductos() {
    this.productosList = null;
     this.gService
      .list('producto')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.productosList = data;
      }); 
  }

  public errorHandling = (controlName: string) => {
    let messageError=''
    const control = this.inventarioForm.get(controlName);
    if(control.errors){
      for (const message of FormErrorMessage) {
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
    //Obtener id bodegas del Formulario y Crear arreglo con {id: value}
    let bodegasForm=this.inventarioForm.get('bodegas').value
    let productosForm=this.inventarioForm.get('productos').value
                    
    //Asignar valor al formulario
    //setValue
    this.inventarioForm.patchValue({bodega:bodegasForm})
    this.inventarioForm.patchValue({producto:productosForm})
    this.inventarioForm.patchValue({bodegaId:bodegasForm.value})
    this.inventarioForm.patchValue({productoId:productosForm.value})
    
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
