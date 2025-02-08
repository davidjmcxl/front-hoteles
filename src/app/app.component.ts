import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  title = 'Administracion-hotelesAPP';
  email: string = '';
  password: string = '';
   constructor(private authService: AuthService) {}



 login() {
    this.authService.login(this.email, this.password)
      .then(() => alert('Inicio de sesión exitoso'))
      .catch(err => alert('Error: ' + err.message));
  }

  register() {
    this.authService.register(this.email, this.password)
      .then(() => alert('Usuario registrado correctamente'))
      .catch((err:any) => alert('Error: ' + err.message));
  }
}
