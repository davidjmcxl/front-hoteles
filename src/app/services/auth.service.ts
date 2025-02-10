import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth,private router:Router) {}

  // Iniciar sesión con email y contraseña
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Registrarse con email y contraseña
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Cerrar sesión
  logout() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']).then(() => {
        window.history.replaceState(null, '', '/login'); // Elimina el historial de navegación
      });
    });
  }

}
