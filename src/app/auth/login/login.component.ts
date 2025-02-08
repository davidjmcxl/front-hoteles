import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[
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
      if(!this.loginForm.valid){
        return;
      }
      const { correo, password } = this.loginForm.value;
      this.authService.login(correo, password)
        .then(() => alert('Inicio de sesión exitoso'))
        .catch(err => alert('Error: ' + err.message));
    }
}
