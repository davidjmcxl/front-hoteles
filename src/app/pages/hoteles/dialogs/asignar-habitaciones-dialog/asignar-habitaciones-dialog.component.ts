import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoHabitacion, Habitacion, Hotel } from '../../models/hotel.model';
import { MaterialModule } from '../../../../material/material.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-asignar-habitaciones-dialog',
  templateUrl: './asignar-habitaciones-dialog.component.html',
  imports:[MaterialModule,ReactiveFormsModule,CommonModule],
  styleUrls: ['./asignar-habitaciones-dialog.component.scss']
})
export class AsignarHabitacionesDialogComponent {
  habitacionForm: FormGroup;
  habitaciones: Habitacion[] = [];

  tiposHabitacion = Object.values(TipoHabitacion); // Obtener los valores del enum

  constructor(
    private dialogRef: MatDialogRef<AsignarHabitacionesDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { hotel: Hotel }
  ) {
    this.habitacionForm = this.fb.group({
      tipo: ['', Validators.required],
      costoBase: ['', [Validators.required, Validators.min(1)]],
      impuestos: ['', [Validators.required, Validators.min(0)]],
      disponible: [true]
    });
  }

  agregarHabitacion() {
    if (this.habitacionForm.valid) {
      this.habitaciones.push(this.habitacionForm.value);
      this.habitacionForm.reset({ disponible: true }); // Resetear el formulario
    }
  }

  guardar() {
    this.dialogRef.close(this.habitaciones);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
