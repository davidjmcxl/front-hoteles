import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Habitacion, Hotel } from '../hoteles/models/hotel.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotelService } from '../../services/hotel.service';
import { HabitacionService } from '../../services/habitacion.service';
import { EditHabitacionComponent } from './dialogs/edit-habitacion/edit-habitacion.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habitaciones',
  imports: [MaterialModule,CommonModule,ReactiveFormsModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.scss'
})
export class HabitacionesComponent {
  public hoteles:Hotel[]=[];
  public hotelId!:string;
  displayedColumns: string[] = ['N°','ubicacion','Costo', 'impuestos', 'tipo','disponible', 'acciones'];
  dataSourceHabitacion = new MatTableDataSource<Habitacion>();
   constructor(private hotelService: HotelService, private habitacionService: HabitacionService, private dialog: MatDialog) {}




  hotelSeleccionado = new FormControl<string>('');
  habitaciones: any[] = [];

  ngOnInit() {
    this.getHoteles()
    this.hotelSeleccionado.valueChanges.subscribe((hotelId:any) => {
   this.habitacionService.getHabitaciones(hotelId).subscribe(habitaciones=>{
    this.hotelId=hotelId;
    this.dataSourceHabitacion.data = habitaciones;
   })
    });
  }
  getHoteles(){
    this.hotelService.obtenerHoteles().subscribe(hoteles => {
      this.hoteles= hoteles;
    });
  }
  aplicarFiltro(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSourceHabitacion.filter = filtro;
  }
  editarHabitacion(habitacion:Habitacion){
 const dialogRef = this.dialog.open(EditHabitacionComponent, {
      width: '600px',
      disableClose: true,
      data: { habitacion, }
    });

    dialogRef.afterClosed().subscribe((habitacionEditada: Habitacion) => {
      if (habitacionEditada) {
        this.habitacionService.actualizarHabitacion(this.hotelId,habitacionEditada).then(() => {
          Swal.fire('habitacion actualizada correctamente', '', 'success');
        }).catch(error => {
          Swal.fire('error al actualizar la habitacion', '', 'error');
          console.error(error);
        });
      }
    });
  }
   /**
   * Cambia el estado de disponibilidad de la habitación
   */
   async toggleHabitacion( habitacion: Habitacion) {
    try {
      const nuevoEstado = !habitacion.disponible;
      await this.habitacionService.cambiarEstadoHabitacion(this.hotelId, habitacion.id as string, nuevoEstado);
      habitacion.disponible = nuevoEstado; // Actualizar en la UI
   
    } catch (error) {
      console.error('Error al cambiar estado de la habitación:', error);
    }
  }
}
