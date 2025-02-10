import { Component, OnInit } from '@angular/core';
import { HabitacionService } from '../../services/habitacion.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Reserva } from '../hoteles/models/reserva.model';
import { DetallesReservaComponent } from './dialogs/detallesReserva/detallesReserva.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reservas',
   imports:[ReactiveFormsModule,CommonModule,MaterialModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent implements OnInit {
  displayedColumns: string[] = [
    'hotelNombre',
    'habitacionNombre',
    'fechaEntrada',
    'fechaSalida',
    'cantidadPersonas',
    'contactoEmergencia',
    'acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);
  constructor(private habitacionService:HabitacionService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.obtenerReservas();

  }
  obtenerReservas(): void {
    this.habitacionService.obtenerTodasLasReservas().then(reservas => {

      const reservasAplanadas: any  [] = reservas.flatMap(hab =>
        hab.reservas.map(reserva => ({
          hotelNombre: hab.hotelNombre,
          habitacionNombre: hab.habitacionNombre,
          fechaEntrada: reserva.fechaEntrada,
          fechaSalida: reserva.fechaSalida,
          cantidadPersonas: reserva.cantidadPersonas,
          contactoEmergencia: reserva.contactoEmergencia,
          huespedes: reserva.huespedes
        }))
      );
      this.dataSource.data = reservasAplanadas;
    });
  }

  verDetalles(reserva: any) {
    this.dialog.open(DetallesReservaComponent, {
      width: '600px',
      data: reserva
    });
  }
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
