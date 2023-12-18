import Pelicula from "./interface_pelicula";

export class Pelicula_model {
  private backendUrl: string = "http://localhost:4000/api/peliculas/imprimir_registros";

  constructor() {
    console.log("MODEL: Pelicula...")
  }

  async Cargar_peliculas(token:string): Promise<Response> {
    console.log("MODEL: Usuario_model; FUNCTION: model_iniciar_sesion()");
    console.log("token de la cabecera: ",token)

    const cabecera = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Agregamos el token de autorización
    };

    const metodo = 'GET';
    try {
    const respuesta = await fetch(this.backendUrl, { method: metodo, headers: cabecera});
      console.log("respuesta: ", respuesta)
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

}
