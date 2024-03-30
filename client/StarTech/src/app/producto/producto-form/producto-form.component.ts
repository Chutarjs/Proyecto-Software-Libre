import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../shared/services/notification.service';
import { FormErrorMessage } from '../../form-error-message';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
})
export class ProductoFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Lista de categorias
  categoriasList: any;
  //Lista de subcategorias
  subcategoriasList: any;
  //Producto a actualizar
  productoInfo: any;
  //Respuesta del API crear/modificar
  respProducto: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  productoForm: FormGroup;
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
    this.listaCategorias()
    this.listaSubcategorias()
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idProducto=params['id']
      if(this.idProducto != undefined){
        this.isCreate=false
        this.titleForm='Actualizar'
        //Obtener videojuego a actualizar del API
        this.gService
          .get('producto', this.idProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data)=>{
            console.log(data)
            this.productoInfo=data
            //Establecer valores a precargar en el formulario
            this.productoForm.setValue({
              id: this.productoInfo.id,
              nombre: this.productoInfo.nombre,
              precio: this.productoInfo.costoUnitario,
              categorias: this.productoInfo.categorias.map(({id})=>id),
              subcategorias: this.productoInfo.subcategorias.map(({id})=>id)
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
    this.productoForm=this.fb.group({
      //identificador
      id:[null,null],
      nombre:[null,Validators.compose([
        Validators.required,
        Validators.minLength(2) 
      ])        
      ],
      descripcion:[null,Validators.required],
      precio: [null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+[.,]{1,1}\[0-9]{2,2}$')
      ]) 
      ],
      publicar: [true,Validators.required],
      generos: [null,Validators.required]      
    })
  }
  listaCategorias() {
    this.categoriasList = null;
     this.gService
      .list('categoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.categoriasList = data;
      }); 
  }  
  listaSubcategorias() {
    this.subcategoriasList = null;
     this.gService
      .list('subcategoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.subcategoriasList = data;
      }); 
  }

  public errorHandling = (controlName: string) => {
    let messageError=''
    const control = this.productoForm.get(controlName);
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
  
  submitProducto(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.productoForm.invalid) {
      return;
    }
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let categoriasForm=this.productoForm.get('categorias').value
                    .map((x:any)=>({ ['id']:x }))
    let subcategoriasForm=this.productoForm.get('subcategorias').value
                    .map((x:any)=>({ ['id']:x }))
                    
    //Asignar valor al formulario
    //setValue
    this.productoForm.patchValue({categorias:categoriasForm})
    this.productoForm.patchValue({subcategorias:subcategoriasForm})
    console.log(this.productoForm.value);
  
    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
       this.gService
        .create('producto', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;
          this.noti.mensajeRedirect('Crear Videojuego', 
          `Videojuego creado: ${data.nombre}`,
          TipoMessage.success,
          'producto-table')
           this.router.navigate(['/producto-table']); 
        }); 
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
       this.gService
        .update('producto', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;
          
          this.noti.mensajeRedirect('Actualizar Producto', 
          `Producto actualizado: ${data.nombre}`,
          TipoMessage.success,
          'producto-table')
           this.router.navigate(['/producto-table']); 
        }); 
    }
  }
  
  onReset() {
    this.submitted = false;
    this.productoForm.reset();
  }
  onBack() {
    this.router.navigate(['/producto-table']); 
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
