

export interface Habitacion {
  id?: string;
  nombre:string;
  tipo: TipoHabitacion;
  ubicacion:Ubicacion;
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
export enum Ubicacion{
  PRIMER = '1 piso',
  SEGUNDO = '2 piso ',
  TERCER = '3 piso',
  CUARTO = '4 piso ',
  OTRO = 'Otro piso'
}

