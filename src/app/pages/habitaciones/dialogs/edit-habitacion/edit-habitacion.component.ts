import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditarHotelDialogComponent } from '../../../hoteles/dialogs/editar-hotel-dialog/editar-hotel-dialog.component';
import { Habitacion, Hotel, TipoHabitacion, Ubicacion } from '../../../hoteles/models/hotel.model';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-edit-habitacion',
  imports: [CommonModule,ReactiveFormsModule,MaterialModule],
  templateUrl: './edit-habitacion.component.html',
  styleUrl: './edit-habitacion.component.scss'
})
export class EditHabitacionComponent {
 public habitacionForm: FormGroup;
 public tiposHabitacion = Object.values(TipoHabitacion);
 public UbicacionHotel= Object.values(Ubicacion);
  constructor(
    private dialogRef: MatDialogRef<EditarHotelDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { habitacion: Habitacion, tiposHabitacion:TipoHabitacion,UbicacionHotel:Ubicacion}
  ) {
    this.habitacionForm = this.fb.group({
      id: [data.habitacion.id],
      nombre: [data.habitacion.nombre, [Validators.required, Validators.minLength(3)]],
      ubicacion: [data.habitacion.ubicacion, [Validators.required, Validators.minLength(5)]],
      costoBase: [data.habitacion.costoBase, [Validators.required]],
      tipo: [data.habitacion.tipo, [Validators.required]],
      impuestos: [data.habitacion.impuestos, [Validators.required]],
      disponible: [data.habitacion.disponible, [Validators.required]],
    });

  }

  guardarCambios() {
    if (this.habitacionForm.valid) {
      this.dialogRef.close(this.habitacionForm.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
