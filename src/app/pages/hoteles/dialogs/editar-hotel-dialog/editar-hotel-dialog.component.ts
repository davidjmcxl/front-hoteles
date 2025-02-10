import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material/material.module';
import { Hotel } from '../../models/hotel.model';




@Component({
  selector: 'app-editar-hotel-dialog',
  imports: [ReactiveFormsModule,CommonModule,MaterialModule],
  templateUrl: './editar-hotel-dialog.component.html',
  styleUrl: './editar-hotel-dialog.component.scss'
})
export class EditarHotelDialogComponent {
  hotelForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditarHotelDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { hotel: Hotel }
  ) {
    this.hotelForm = this.fb.group({
      id: [data.hotel.id],
      nombre: [data.hotel.nombre, [Validators.required, Validators.minLength(3)]],
      direccion: [data.hotel.direccion, [Validators.required, Validators.minLength(5)]],
      ciudad: [data.hotel.ciudad, [Validators.required, Validators.minLength(4)]],
      activo: [data.hotel.activo]
    });
  }

  guardarCambios() {
    if (this.hotelForm.valid) {
      this.dialogRef.close(this.hotelForm.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
