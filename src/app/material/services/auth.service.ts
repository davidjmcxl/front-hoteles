import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuario: any = null;

  login(credentials: { email: string; password: string }) {
    // Simulación de login (debería integrarse con API)
    this.usuario = { id: 1, nombre: 'Agente de Viajes', rol: 'AGENTE' };
    return this.usuario;
  }

  logout() {
    this.usuario = null;
  }

  getUsuario() {
    return this.usuario;
  }
}
