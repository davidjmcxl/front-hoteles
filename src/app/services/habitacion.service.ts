import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, doc, deleteDoc, collectionData, getDocs } from '@angular/fire/firestore';
import { combineLatest, from, map, Observable, switchMap } from 'rxjs';
import { Hotel, Habitacion } from '../pages/hoteles/models/hotel.model';
import { Reserva } from '../pages/hoteles/models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private hotelesRef;

  constructor(private firestore: Firestore) {
    this.hotelesRef = collection(this.firestore, 'hoteles');
  }

  getHabitaciones(hotelId: string): Observable<Habitacion[]> {
    const habitacionesRef = collection(this.firestore, `hoteles/${hotelId}/habitaciones`);
    return collectionData(habitacionesRef, { idField: 'id' }) as Observable<Habitacion[]>;
  }


  async actualizarHabitacion(hotelId: string, habitacion: Habitacion) {
    const habitacionDoc = doc(this.firestore, `hoteles/${hotelId}/habitaciones/${habitacion.id}`);
    await updateDoc(habitacionDoc, {
      nombre:habitacion.nombre,
      tipo: habitacion.tipo,
      costoBase: habitacion.costoBase,
      impuestos: habitacion.impuestos,
      capacidad:habitacion.capacidad,
      disponible: habitacion.disponible,
      ubicacion:habitacion.ubicacion,

    });
  }
  /**
   * Deshabilita o habilita una habitación cambiando su estado de "disponible"
   * @param hotelId ID del hotel
   * @param habitacionId ID de la habitación
   * @param estado Nuevo estado de disponibilidad (true o false)
   */
  async cambiarEstadoHabitacion(hotelId: string, habitacionId: string, estado: boolean): Promise<void> {
    const habitacionDoc = doc(this.firestore, `hoteles/${hotelId}/habitaciones/${habitacionId}`);
    await updateDoc(habitacionDoc, { disponible: estado });
  }

  async obtenerTodasLasReservas(): Promise<{
    hotelId: string;
    hotelNombre: string;
    habitacionId: string;
    habitacionNombre: string;
    reservas: Reserva[];
  }[]> {
    const hotelesRef = collection(this.firestore, 'hoteles');
    const hotelesSnapshot = await getDocs(hotelesRef);
    let reservasTotales: {
      hotelId: string;
      hotelNombre: string;
      habitacionId: string;
      habitacionNombre: string;
      reservas: Reserva[];
    }[] = [];

    for (const hotelDoc of hotelesSnapshot.docs) {
      const hotelId = hotelDoc.id;
      const hotelData = hotelDoc.data();
      const hotelNombre = hotelData["nombre"];  // Obtiene el nombre del hotel

      const habitacionesRef = collection(this.firestore, `hoteles/${hotelId}/habitaciones`);
      const habitacionesSnapshot = await getDocs(habitacionesRef);

      for (const habitacionDoc of habitacionesSnapshot.docs) {
        const habitacionId = habitacionDoc.id;
        const habitacionData = habitacionDoc.data() as Habitacion;
        const habitacionNombre = habitacionData.nombre; // Obtiene el nombre de la habitación

        const reservasRef = collection(this.firestore, `hoteles/${hotelId}/habitaciones/${habitacionId}/reservas`);
        const reservasSnapshot = await getDocs(reservasRef);

        const reservas: Reserva[] = reservasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Reserva));

        if (reservas.length > 0) {
          reservasTotales.push({
            hotelId,
            hotelNombre,
            habitacionId,
            habitacionNombre,
            reservas
          });
        }
      }
    }

    return reservasTotales;
  }

}
