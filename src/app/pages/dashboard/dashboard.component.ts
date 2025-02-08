import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isSidenavOpen = false;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
