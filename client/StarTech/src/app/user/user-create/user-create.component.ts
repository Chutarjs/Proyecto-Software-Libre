import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericService } from '../../share/generic.service';
import { AuthenticationService } from '../../share/authentication.service';
import { FormErrorMessage } from '../../form-error-message';
import {
  NotificacionService,
  TipoMessage,
} from '../../share/notification.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  hide = true;
  usuario: any;
  roles: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      nombre: ['', [Validators.required]],
      correoElectronico : ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      rol: ['', [Validators.required]],
    });
    this.getRoles();
  }
  ngOnInit(): void {}
  submitForm() {
    this.makeSubmit = true;
    //Validación
    if (this.formCreate.invalid) {
      return;
    }
    this.authService
      .createUser(this.formCreate.value)
      .subscribe((respuesta: any) => {
        this.usuario = respuesta;        
        this.notificacion.mensajeRedirect(
          'Registrar usuario',
          `Usuario creado`,
          TipoMessage.success,
          '/'
        );
        this.router.navigate(['/usuario/login']);
      });

  }
  onReset() {
    this.formCreate.reset();
  }
  getRoles() {
    this.gService
      .list('rol')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.roles = data;
        console.log(this.roles);
      });
  }
  /* Manejar errores de formulario en Angular */

  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.formCreate.get(controlName);
    if (control.errors) {
      for (const message of FormErrorMessage) {
        if (
          control &&
          control.errors[message.forValidator] &&
          message.forControl == controlName
        ) {
          messageError = message.text;
        }
      }
      return messageError;
    } else {
      return false;
    }
  };
}
