import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isSidenavOpen = false;
  constructor(private authService: AuthService) { }
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  cerrarSesion() {

    this.authService.logout();

  }
}
