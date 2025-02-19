import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Hotel } from '../../models/hotel.model';
import { MaterialModule } from '../../../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-hotel-dialog',
  imports: [MaterialModule,ReactiveFormsModule,CommonModule],
  templateUrl: './agregar-hotel-dialog.component.html',
  styleUrl: './agregar-hotel-dialog.component.scss'
})
export class AgregarHotelDialogComponent {
  hotelForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AgregarHotelDialogComponent>,
    private fb: FormBuilder
  ) {
    this.hotelForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      ciudad: ['', [Validators.required, Validators.minLength(4)]],
      activo: [true] , // Valor por defecto
      habitaciones:[]
    });
  }

  guardarHotel() {
    if (this.hotelForm.valid) {
      const nuevoHotel: Hotel = this.hotelForm.value;
      this.dialogRef.close(nuevoHotel);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
