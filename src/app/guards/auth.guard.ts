import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user: User | null) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
