import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../shared/services/notification.service';
import { FormErrorMessage } from '../../form-error-message';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  userInfo: any;
  respUser: any;
  submitted = false;
  userForm: FormGroup;
  idUser: number = 0;
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
      this.idUser = params['id'];
      if (this.idUser !== undefined) {
        this.isCreate=false
        this.titleForm='Actualizar'
        this.gService
        .get('user', this.idUser)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
            console.log(data)
            this.userInfo = data;
            this.userForm.setValue({
              id: this.userInfo.id,
              nombre: this.userInfo.nombre,
              direccion: this.userInfo.direccion,
              provincia: this.userInfo.provincia,
              canton: this.userInfo.canton,
              distrito: this.userInfo.distrito,
              correoElectronico: this.userInfo.correoElectronico,
              numeroTelefono: this.userInfo.numeroTelefono
            })
          })
      }
    })
  }

  formularioReactive() {
    this.userForm = this.fb.group({
      id: [null],
      nombre: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      direccion: [null, Validators.required],
      correoElectronico: [null, Validators.compose([Validators.required, Validators.email])],
    });
  }
  

  public errorHandling = (controlName: string) => {
    let messageError=''
    const control = this.userForm.get(controlName);
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
  
  submitUser(): void {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
  
    const userData = {
      id: this.userForm.value.id,
      nombre: this.userForm.value.nombre,
      direccion: this.userForm.value.direccion,
      correoElectronico: this.userForm.value.correoElectronico,
      numeroTelefono: this.userForm.value.numeroTelefono
    };
    console.log(userData)
  
    if (this.isCreate) {
      this.gService
        .create('user', userData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respUser = data;
          this.noti.mensajeRedirect('Crear Proveedor', 
          `Proveedor creado: ${data.nombre}`,
          TipoMessage.success,
          'user-table');
          this.router.navigate(['/user-table']); 
        }); 
    } else {
      this.gService
        .update('user', userData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respUser = data;
          this.noti.mensajeRedirect('Actualizar Proveedor', 
          `Proveedor actualizado: ${data.nombre}`,
          TipoMessage.success,
          'user-table');
          this.router.navigate(['/user-table']); 
        }); 
    }
  }
  
  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }
  
  onBack() {
    this.router.navigate(['/user-table']); 
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}