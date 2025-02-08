import { Component, OnInit } from '@angular/core';
import { Habitacion, Hotel } from './models/hotel.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotelService } from '../../services/hotel.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarHotelDialogComponent } from './dialogs/agregar-hotel-dialog/agregar-hotel-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AsignarHabitacionesDialogComponent } from './dialogs/asignar-habitaciones-dialog/asignar-habitaciones-dialog.component';
import { EditarHotelDialogComponent } from './dialogs/editar-hotel-dialog/editar-hotel-dialog.component';


@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.scss'],
  imports:[ReactiveFormsModule,CommonModule,MaterialModule]
})
export class HotelesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'direccion', 'habitaciones', 'activo', 'acciones'];
  dataSource = new MatTableDataSource<Hotel>();
  hoteles: Hotel[] = [];

    constructor(private hotelService: HotelService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() {
    this.getHoteles()
  }
  getHoteles(){
    this.hotelService.obtenerHoteles().subscribe(hoteles => {
      this.dataSource.data = hoteles;
    });
  }
  aplicarFiltro(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filtro;
  }

  agregarHotel() {
    const dialogRef = this.dialog.open(AgregarHotelDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((nuevoHotel: Hotel) => {
      if (nuevoHotel) {
        this.hotelService.agregarHotel(nuevoHotel).then(() => {
         Swal.fire('Hotel agregado con exito', '', 'success');
        }).catch(error => {
          this.snackBar.open('Error al agregar hotel', 'Cerrar', { duration: 2000 });
          console.error(error);
        });
      }
    });
  }


  asignarHabitacion(hotel: Hotel) {

      const dialogRef = this.dialog.open(AsignarHabitacionesDialogComponent, {
        width: '600px',
        disableClose: true,
        data: { hotel }
      });

      dialogRef.afterClosed().subscribe((habitaciones: Habitacion[]) => {
        if (habitaciones && habitaciones.length > 0) {
          this.hotelService.asignarHabitacion(hotel.id!, habitaciones)
            .then(() => {
              Swal.fire('Habitaciones asignadas con exito', '', 'success');
              this.getHoteles();
            })
            .catch(error => console.error('Error al asignar habitaciones:', error));
        }
      });

  }


  editarHotel(hotel: Hotel) {
    const dialogRef = this.dialog.open(EditarHotelDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { hotel }
    });

    dialogRef.afterClosed().subscribe((hotelEditado: Hotel) => {
      if (hotelEditado) {
        this.hotelService.actualizarHotel(hotelEditado).then(() => {
          Swal.fire('Hotel actualizado correctamente', '', 'success');
        }).catch(error => {
          this.snackBar.open('Error al actualizar hotel', 'Cerrar', { duration: 2000 });
          console.error(error);
        });
      }
    });
  }

  toggleHotel(hotel: Hotel) {
    this.hotelService.toggleHotel(hotel.id!, hotel.activo);
  }
}
