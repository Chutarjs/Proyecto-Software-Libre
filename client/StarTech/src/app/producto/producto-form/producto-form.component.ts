import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../shared/services/notification.service';
import { FormErrorMessage } from '../../form-error-message';
import { tick } from '@angular/core/testing';

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
  categorias: any;
  //Lista de subcategorias
  subcategorias: any;
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
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idProducto=params['id']
      if(this.idProducto != undefined){
        this.isCreate=false
        this.titleForm='Actualizar'
        this.cargarCategorias();
        //Obtener videojuego a actualizar del API
        this.gService
          .get('producto', this.idProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data)=>{
            this.productoInfo=data
            //Establecer valores a precargar en el formulario
            this.productoForm.patchValue({
              id: this.productoInfo.id,
              nombre: this.productoInfo.nombre,
              descripcion: this.productoInfo.descripcion,
              costoUnitario: this.productoInfo.costoUnitario,
              mesesGarantia: this.productoInfo.mesesGarantia,
              estado: this.productoInfo.estado,
              categoria: this.productoInfo.subcategoria.categoria.id,
              subcategoria: this.productoInfo.subcategoriaId,
              sku: this.productoInfo.sku
            });
            this.onChangeSubcategoria();
            this.cargarSubcategorias(this.productoInfo.subcategoria.categoria);
            console.log(this.productoInfo)
          })
          //[{id:5, nombre: valor, ..}]
          //[5,4]
      }
    })
    this.cargarCategorias();
  }
  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.productoForm=this.fb.group({
      id:[null, null],
      sku:[null, Validators.compose([
        Validators.required
      ])],
      nombre:[null,Validators.compose([
        Validators.required,
        Validators.minLength(2) 
      ])],
      descripcion:[null,Validators.required],
      costoUnitario: [null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+[.,]{1,1}\[0-9]{2,2}$')
      ])],
      mesesGarantia:[null, Validators.required],
      estado:[null, Validators.required],
      categoria:[null,Validators.required],
      subcategoria: [null,Validators.required]      
    })
  }

    cargarCategorias() {
    this.categorias = null;
     this.gService
      .list('categoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.categorias = data;
      }); 
  }  
  cargarSubcategorias(categoriaSeleccionada: any) {
    console.log("Categoria seleccionada: " + categoriaSeleccionada.subcategoria)
    this.subcategorias = categoriaSeleccionada.subcategorias; 
  }
  onChangeCategoria(): void {
    const categoriaSeleccionada = this.categorias.find(p => p.id === this.productoForm.get('categoria').value);
    this.cargarSubcategorias(categoriaSeleccionada);
  }
  onChangeSubcategoria(): void {
    const categoriaSeleccionada = this.categorias.find(p => p.id === this.productoForm.get('categoria').value).nombre;
    const subcategoriaSeleccionada = this.subcategorias.find(p => p.id === this.productoForm.get('subcategoria').value).nombre;
    if(this.idProducto == undefined){
      this.productoForm.get('sku').setValue(categoriaSeleccionada.slice(0, 3).toUpperCase() + "-" + subcategoriaSeleccionada.slice(0, 3).toUpperCase());
    }
    else{
      this.productoForm.get('sku').setValue(categoriaSeleccionada.slice(0, 3).toUpperCase() + "-" + subcategoriaSeleccionada.slice(0, 3).toUpperCase() + "-" + this.idProducto);
    }
  }
  
  public errorHandling = (controlName: string) => {
    let messageError=''
    const control = this.productoForm.get(controlName);
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
    console.log(this.productoForm)
    let categoriasForm=this.productoForm.get('categoria').value
    let subcategoriasForm=this.productoForm.get('subcategoria').value
                    
    //Asignar valor al formulario
    //setValue
    this.productoForm.patchValue({categorias:categoriasForm})
    this.productoForm.patchValue({subcategorias:subcategoriasForm})
    console.log(this.productoForm.value);

    this.productoForm.get('costoUnitario').setValue(parseFloat(this.productoForm.get('costoUnitario').value))
    this.productoForm.get('mesesGarantia').setValue(parseInt(this.productoForm.get('mesesGarantia').value))
  
    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('producto', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;
          this.noti.mensajeRedirect('Crear Producto', 
          `Producto creado: ${data.nombre}`,
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
