import { Pelicula } from "./interface_pelicula";

export class Pelicula_model {
  private backendUrl_GET: string = "http://localhost:4000/api/peliculas/imprimir_registros";
  private backendUrl_PUT :string  ="http://localhost:4000/api/peliculas/actualizar_pelicula";
  constructor() {
    console.log("MODEL: Pelicula...")
  }

  async Cargar_peliculas(token:string): Promise<Response> {
    console.log("MODEL: Pelicula_model; FUNCTION: Cargar_peliculas()");
    console.log("token: ",token)

    const cabecera = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Agregamos el token de autorización
    };

    const metodo = 'GET';
    try {
    const respuesta: Response = await fetch(this.backendUrl_GET, { method: metodo, headers: cabecera});
      console.log("response: ", respuesta)
      if (!respuesta.ok) {
        throw new Error(`Error al cargar peliculas: ${respuesta.status} - ${respuesta.statusText}`);
      } else {
        return respuesta;
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", /*error*/);
      throw new Error("Error al cargar peliculas");
    }
  }

  async Update_peliculas(token:string,pelicula:Pelicula): Promise<Response> {
    console.log("MODEL: Pelicula_model; FUNCTION: Update_peliculas()");
    console.log("token: ",token)
 

    const cabecera = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Agregamos el token de autorización
    };

    const metodo = 'PUT';
    let contenido = JSON.stringify(pelicula)
    console.log("contenido: ", contenido)

    try {
    const respuesta: Response = await fetch(this.backendUrl_PUT, { method: metodo, headers: cabecera, body: contenido});
      console.log("response: ", respuesta)
      if (!respuesta.ok) {
        throw new Error(`Error al actualizar peliculas: ${respuesta.status} - ${respuesta.statusText}`);
      } else {
        return respuesta;
      }
    } catch (error) {
      console.error("Error al actualizar la pelicula:", error);
      throw new Error("Error al actualizar la pelicula");
    }
  }

  

}
