import { Pelicula } from "./interface_pelicula";

export class Pelicula_model {
  private backendUrl_GET_ALL: string = "http://localhost:4000/api/peliculas/imprimir_registros";
  private backendUrl_UPDATE: string = "http://localhost:4000/api/peliculas/actualizar_pelicula";
  private backendUrl_DELETE: string = "http://localhost:4000/api/peliculas/borrar_pelicula";
  private backendUrl_REGISTER: string = "http://localhost:4000/api/peliculas/registrar_pelicula";
  private backendUrl_POST: string = "http://localhost:4000/api/imagenes/subida_de_imagen"

  constructor() {
    console.log("MODEL: Pelicula...")
  }

  async Post_caratula(token: string, formData: FormData): Promise<Response> {
    console.log("MODEL: Pelicula_model; FUNCTION: Post_caratula()");
    console.log("token: ", token);
    // Mostrar el contenido de FormData en la consola
    console.log("--------------");
    console.log("Contenido de FormData:");
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    console.log("--------------");
  
    const cabecera = {
      'Authorization': `Bearer ${token}`,
    };
  
    const metodo = 'POST';
  
    try {
      const respuesta: Response = await fetch(this.backendUrl_POST, { method: metodo, headers: cabecera, body: formData });
      console.log("response: ", respuesta);
  
      if (!respuesta.ok) {
        throw new Error(`Error al subir caratula: ${respuesta.status} - ${respuesta.statusText}`);
      } else {
        return respuesta;
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      throw new Error("Error al subir caratula pelicula");
    }
  }
  
  async Cargar_peliculas(token: string): Promise<Response> {
    console.log("MODEL: Pelicula_model; FUNCTION: Cargar_peliculas()");
    console.log("token: ", token)

    const cabecera = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Agregamos el token de autorización
    };

    const metodo = 'GET';
    try {
      const respuesta: Response = await fetch(this.backendUrl_GET_ALL, { method: metodo, headers: cabecera });
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

  async Update_peliculas(token: string, pelicula: Pelicula): Promise<Response> {
    console.log("MODEL: Pelicula_model; FUNCTION: Update_peliculas()");
    console.log("token: ", token)


    const cabecera = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Agregamos el token de autorización
    };

    const metodo = 'PUT';
    let contenido = JSON.stringify(pelicula)
    console.log("contenido: ", contenido)

    try {
      const respuesta: Response = await fetch(this.backendUrl_UPDATE, { method: metodo, headers: cabecera, body: contenido });
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

  async borrarPelicula(token: string, pelicula: Pelicula): Promise<Response> {
    console.log("MODEL: Pelicula_model; FUNCTION: borrarPelicula()");
    console.log("token: ", token);

    const cabecera = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const metodo = 'DELETE';
    let id: number | undefined = pelicula.id
    try {

      if (id != undefined) {
        const url = `${this.backendUrl_DELETE}/${pelicula.id}`;
        const respuesta: Response = await fetch(url, { method: metodo, headers: cabecera });

        if (!respuesta.ok) {
          throw new Error(`Error al borrar película: ${respuesta.status} - ${respuesta.statusText}`);
        } else {
          return respuesta;
        }
      } else {
        throw new Error("Error al borrar la película el identificador es undefined");
      }
    } catch (error) {
      console.error("Error al borrar la película:", error);
      throw new Error("Error al borrar la película");
    }
  }

  async registrarPelicula(token: string, pelicula: Pelicula): Promise<Response> {
    console.log("MODEL: Pelicula_model; FUNCTION: registrarPelicula()");
    console.log("token: ", token);

    const cabecera = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const metodo = 'POST';
    let contenido = JSON.stringify(pelicula);
    console.log("contenido: ", contenido);

    try {
      const respuesta: Response = await fetch(this.backendUrl_REGISTER, { method: metodo, headers: cabecera, body: contenido });

      if (!respuesta.ok) {
        throw new Error(`Error al registrar película: ${respuesta.status} - ${respuesta.statusText}`);
      } else {
        return respuesta;
      }
    } catch (error) {
      console.error("Error al registrar la película:", error);
      throw new Error("Error al registrar la película");
    }
  }

}
