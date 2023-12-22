interface Pelicula {
  id?: number;
  ruta?: string;
  nombre: string;
  sinopsis: string;
  anio_lanzamiento: number;
}

interface PeliculaDB {
  anio_lanzamiento: number | null;
  createdAt: any;
  id: number;
  nombre: string;
  ruta: string | null;
  sinopsis: string | null;
  updatedAt:any;
}

interface Response_json {
  mensaje: string;
  resultado: PeliculaDB[];
  success: boolean;
}

export type { Pelicula, Response_json, PeliculaDB };
