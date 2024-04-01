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
  provincias: any[] = [];
  cantones: any[] = [];
  distritos: any[] = [];
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
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idProveedor = params['id'];
      if (this.idProveedor !== undefined) {
        this.isCreate=false
        this.titleForm='Actualizar'
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
              distritoId: this.proveedorInfo.distritoId,
              correoElectronico: this.proveedorInfo.correoElectronico,
              numeroTelefono: this.proveedorInfo.numeroTelefono
            })
          })
      }
    })
    this.cargarProvincias();  // Cambiado a cargarProvincias
  }

  formularioReactive() {
    this.proveedorForm = this.fb.group({
      id: [null],
      nombre: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      direccion: [null, Validators.required],
      distritoId: [null, Validators.required],
      correoElectronico: [null, Validators.compose([Validators.required, Validators.email])],
      numeroTelefono: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}$')])],
      provincia: [null, Validators.required],
      canton: [null, Validators.required],
      distrito: [null, Validators.required]
    });
  }

  cargarProvincias(): void {
    this.http.get<any>('https://ubicaciones.paginasweb.cr/provincias.json').subscribe(
      data => {
        this.provincias = Object.keys(data).map(key => ({ id: parseInt(key), nombre: data[key] }));
        console.log('Provincias:', this.provincias); // Verificar datos en la consola
      },
      error => {
        console.error('Error al cargar provincias:', error);
      }
    );
  }


  cargarCantones(provinciaId: number): void {
    this.http.get<any>(`https://ubicaciones.paginasweb.cr/provincia/${provinciaId}/cantones.json`).subscribe(
      data => {
        this.cantones = Object.keys(data).map(key => ({ id: parseInt(key), nombre: data[key] }));
        console.log('Cantones:', this.cantones); // Verificar datos en la consola
      },
      error => {
        console.error('Error al cargar cantones:', error);
      }
    );
  }
  
  cargarDistritos(provinciaId: number, cantonId: number): void {
    this.http.get<any>(`https://ubicaciones.paginasweb.cr/provincia/${provinciaId}/canton/${cantonId}/distritos.json`).subscribe(
      data => {
        this.distritos = Object.keys(data).map(key => ({ id: parseInt(key), nombre: data[key] }));
        console.log('Distritos:', this.distritos); // Verificar datos en la consola
      },
      error => {
        console.error('Error al cargar distritos:', error);
      }
    );
  }
  

  listaProvincias(): any[] {
    return this.provincias;
  }
  
  onChangeProvincia(): void {
    const provinciaSeleccionada = this.provincias.find(p => p.id === this.proveedorForm.get('provincia').value);
    this.cargarCantones(provinciaSeleccionada.id);
    this.proveedorForm.get('canton').setValue(null);
    this.proveedorForm.get('distrito').setValue(null);
  }
  
  onChangeCanton(): void {
    const provinciaSeleccionada = this.provincias.find(p => p.id === this.proveedorForm.get('provincia').value);
    const cantonSeleccionado = this.cantones.find(c => c.id === this.proveedorForm.get('canton').value);
    this.cargarDistritos(provinciaSeleccionada.id, cantonSeleccionado.id);
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
    } else {
      return false
    }
  };
  
  submitProveedor(): void {
    this.submitted = true;
    if (this.proveedorForm.invalid) {
      return;
    }
  
    const proveedorData = {
      ...this.proveedorForm.value,
      distritoId: this.proveedorForm.get('distrito').value.id
    };
  
    if (this.isCreate) {
      this.gService
        .create('proveedor', proveedorData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respProveedor = data;
          this.noti.mensajeRedirect('Crear Proveedor', 
          `Proveedor creado: ${data.nombre}`,
          TipoMessage.success,
          'proveedor-table');
          this.router.navigate(['/proveedor-table']); 
        }); 
    } else {
      this.gService
        .update('proveedor', proveedorData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respProveedor = data;
          this.noti.mensajeRedirect('Actualizar Proveedor', 
          `Proveedor actualizado: ${data.nombre}`,
          TipoMessage.success,
          'proveedor-table');
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
    this.destroy$.unsubscribe();
  }
}