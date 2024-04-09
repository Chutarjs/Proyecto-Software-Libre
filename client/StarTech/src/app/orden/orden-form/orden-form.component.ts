import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../shared/services/notification.service';
import { FormErrorMessage } from '../../form-error-message';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-orden-form',
  templateUrl: './orden-form.component.html',
  styleUrls: ['./orden-form.component.css'],
})
export class OrdenFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Lista de proveedores
  proveedores: any;
  //Lista de bodegas
  bodegas: any;
  //Lista de usuarios
  usuarios: any;
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
      if(this.idOrden != undefined){
        this.isCreate=false
        this.titleForm='Actualizar'
        this.cargarProveedores();
        this.cargarBodegas();
        this.cargarUsuarios();
        //Obtener videojuego a actualizar del API
        this.gService
          .get('orden', this.idOrden)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data)=>{
            this.ordenInfo=data
            //Establecer valores a precargar en el formulario
            this.ordenForm.patchValue({
              id: this.ordenInfo.id,
              nombre: this.ordenInfo.nombre,
              descripcion: this.ordenInfo.descripcion,
              costoUnitario: this.ordenInfo.costoUnitario,
              mesesGarantia: this.ordenInfo.mesesGarantia,
              estado: this.ordenInfo.estado,
              categoria: this.ordenInfo.subcategoria.categoria.id,
              subcategoria: this.ordenInfo.subcategoriaId,
              sku: this.ordenInfo.sku
            });
            console.log(this.ordenInfo)
          })
      }
    })
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
            
    })
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
    this.submitted = true;
    //Verificar validación
    if (this.ordenForm.invalid) {
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
    
    console.log(this.ordenForm.value);

    // this.productoForm.get('costoUnitario').setValue(parseFloat(this.productoForm.get('costoUnitario').value))
    // this.productoForm.get('mesesGarantia').setValue(parseInt(this.productoForm.get('mesesGarantia').value))
  
    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('orden', this.ordenForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respOrden = data;
          this.noti.mensajeRedirect('Crear Orden', 
          `Orden creado: ${data.nombre}`,
          TipoMessage.success,
          'orden-table')
           this.router.navigate(['/orden-table']); 
        }); 
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
       this.gService
        .update('orden', this.ordenForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respOrden = data;
          
          this.noti.mensajeRedirect('Actualizar Orden', 
          `Orden actualizado: ${data.nombre}`,
          TipoMessage.success,
          'orden-table')
           this.router.navigate(['/orden-table']); 
        }); 
    }
  }
  
  onReset() {
    this.submitted = false;
    this.ordenForm.reset();
  }
  onBack() {
    this.router.navigate(['/orden-table']); 
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
