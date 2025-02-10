import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detallesReserva',
  templateUrl: './detallesReserva.component.html',
  styleUrls: ['./detallesReserva.component.css'],
  imports: [MaterialModule,CommonModule]
})
export class DetallesReservaComponent{

  constructor(
    public dialogRef: MatDialogRef<DetallesReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public reserva: any
  ) {


  }
  formatoFecha(timestamp: any): string {
    if (!timestamp || !timestamp.seconds) return 'No disponible';
    const fecha = new Date(timestamp.seconds * 1000);
    return fecha.toLocaleDateString();
  }
  cerrar() {
    this.dialogRef.close();
  }
}
