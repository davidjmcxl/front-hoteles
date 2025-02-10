import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, doc, deleteDoc, collectionData, getDocs } from '@angular/fire/firestore';
import { combineLatest, from, map, Observable, switchMap } from 'rxjs';
import { Hotel, Habitacion } from '../pages/hoteles/models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private hotelesRef; // Declarar la referencia sin inicializarla aquí

  constructor(private firestore: Firestore) {
    this.hotelesRef = collection(this.firestore, 'hoteles'); // Inicializar dentro del constructor
  }

  obtenerHoteles(): Observable<Hotel[]> {
    return collectionData(this.hotelesRef, { idField: 'id' }).pipe(
      map((hoteles) =>
        hoteles.map((hotel: any) => ({
          id: hotel.id,
          nombre: hotel.nombre,
          direccion: hotel.direccion,
          ciudad:hotel.ciudad,
          activo: hotel.activo,
          habitaciones: [] // Inicializamos vacío, luego se llenará
        }))
      ),
      switchMap((hoteles: Hotel[]) => {
        const hotelesConHabitaciones$ = hoteles.map(async (hotel) => {
          const habitacionesRef = collection(this.firestore, `hoteles/${hotel.id}/habitaciones`);
          const habitacionesSnapshot = await getDocs(habitacionesRef);
          const habitaciones: Habitacion[] = habitacionesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }) as Habitacion);
          return { ...hotel, habitaciones };
        });

        return from(Promise.all(hotelesConHabitaciones$)); // Convierte la promesa en un Observable
      })
    );
  }

  async agregarHotel(hotel: Hotel) {
    await addDoc(this.hotelesRef, hotel);
  }

  async actualizarHotel(hotel: Hotel) {
    const hotelDoc = doc(this.firestore, `hoteles/${hotel.id}`);
    await updateDoc(hotelDoc, { nombre: hotel.nombre, direccion: hotel.direccion,ciudad:hotel.ciudad ,activo: hotel.activo });
  }

  async eliminarHotel(id: string) {
    const hotelDoc = doc(this.firestore, `hoteles/${id}`);
    await deleteDoc(hotelDoc);
  }

  async toggleHotel(id: string, activo: boolean) {
    const hotelDoc = doc(this.firestore, `hoteles/${id}`);
    await updateDoc(hotelDoc, { activo: !activo });
  }

  async asignarHabitacion(hotelId: string, habitaciones: Habitacion[]) {


    const habitacionesRef = collection(this.firestore, `hoteles/${hotelId}/habitaciones`);

    for (const habitacion of habitaciones) {
      await addDoc(habitacionesRef, habitacion);
    }
  }
}
