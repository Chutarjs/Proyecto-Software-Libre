import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../shared/services/notification.service';
import { FormErrorMessage } from '../../form-error-message';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.css'],
})
export class ProveedorFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  provinciasList: string[] = [];
  cantonesList: string[] = [];
  distritosList: string[] = [];
  proveedorInfo: any;
  respProveedor: any;
  submitted = false;
  proveedorForm: FormGroup;
  idProveedor: number = 0;
  isCreate: boolean = true;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
    this.formularioReactive();
    this.listaProvincias();

  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idProveedor = params['id'];
      if (this.idProveedor !== undefined) {
        this.isCreate=false
        this.titleForm='Actualizar'
        //Obtener videojuego a actualizar del API
        this.gService
        .get('proveedor', this.idProveedor)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
            console.log(data)
            this.proveedorInfo = data;
            this.proveedorForm.setValue({
              id: this.proveedorInfo.id,
              nombre: this.proveedorInfo.nombre,
              direccion: this.proveedorInfo.direccion,
              provincia: this.proveedorInfo.provincia,
              canton: this.proveedorInfo.canton,
              distrito: this.proveedorInfo.distrito,
              correoElectronico: this.proveedorInfo.correoElectronico,
              numeroTelefono: this.proveedorInfo.numeroTelefono
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
    this.proveedorForm = this.fb.group({
      nombre: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      direccion: [null, Validators.required],
      provincia: [null, Validators.required],
      canton: [null, Validators.required],
      distrito: [null, Validators.required],
      correoElectronico: [null, Validators.compose([Validators.required, Validators.email])],
      numeroTelefono: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}$')])]
    })
  }
  listaProvincias() {
    this.http.get<any>('https://ubicaciones.paginasweb.cr/provincias.json')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.provinciasList = data;
      });
  }

  cargarCantones(provincia: string) {
    this.http.get<any>(`https://ubicaciones.paginasweb.cr/provincia/${provincia}/cantones.json`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.cantonesList = data;
      });
  }
  cargarDistritos(canton: string) {
    this.http.get<any>(`https://ubicaciones.paginasweb.cr/canton/${canton}/distritos.json`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.distritosList = data;
      });
  }
  onChangeProvincia(provincia: string) {
    this.proveedorForm.get('canton')?.reset();
    this.proveedorForm.get('distrito')?.reset();
    this.cargarCantones(provincia);
  }
  onChangeCanton(canton: string) {
    this.proveedorForm.get('distrito')?.reset();
    this.cargarDistritos(canton);
  }

  public errorHandling = (controlName: string) => {
    let messageError=''
    const control = this.proveedorForm.get(controlName);
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
  
  submitProveedor(): void {
    this.submitted = true;
    if (this.proveedorForm.invalid) {
      return;
    }

    console.log(this.proveedorForm.value);


    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
       this.gService
        .create('proveedor', this.proveedorForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProveedor = data;
          this.noti.mensajeRedirect('Crear Proveedor', 
          `Proveedor creado: ${data.nombre}`,
          TipoMessage.success,
          'proveedor-table')
           this.router.navigate(['/proveedor-table']); 
        }); 
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
       this.gService
        .update('proveedor', this.proveedorForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProveedor  = data;
          
          this.noti.mensajeRedirect('Actualizar Proveedor', 
          `Proveedor actualizado: ${data.nombre}`,
          TipoMessage.success,
          'proveedor-table')
           this.router.navigate(['/proveedor-table']); 
        }); 
    }
  }
  
  onReset() {
    this.submitted = false;
    this.proveedorForm.reset();
  }
  onBack() {
    this.router.navigate(['/proveedor-table']); 
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
