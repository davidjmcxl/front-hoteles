import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent implements OnInit {
    public cargando:boolean=false;
    public uiSubcrition!:Subscription;
    public loginForm!: FormGroup;
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
    ) {}



    ngOnInit(): void {
      this.loginForm = this.fb.group({
        correo: ['agenteprueba@smart.com', [Validators.required, Validators.email]],
        password: ['agenteSmart', Validators.required],
      });

    }
    login() {
      if (!this.loginForm.valid) {
        Swal.fire({
          icon: 'warning',
          title: 'Formulario inválido',
          text: 'Por favor, completa todos los campos correctamente.'
        });
        return;
      }

      const { correo, password } = this.loginForm.value;

      this.authService.login(correo, password)
        .then(() => {
          this.router.navigate(['/dashboard']);
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: '¡Bienvenido!',
            timer: 2000,
            showConfirmButton: false
          });
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error en el inicio de sesión',
            text: err.message
          });
        });
    }

}
