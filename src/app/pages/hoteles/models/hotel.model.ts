

export interface Habitacion {
  id?: string;
  tipo: TipoHabitacion; // Usamos el enum aquí
  costoBase: number;
  impuestos: number;
  disponible: boolean;
}

export interface Hotel {
  id?: string;
  nombre: string;
  direccion: string;
  activo: boolean;
  habitaciones?: Habitacion[];
}

 export enum TipoHabitacion {
  SENCILLA = 'Sencilla',
  DOBLE = 'Doble',
  SUITE = 'Suite',
  FAMILIAR = 'Familiar'
}
