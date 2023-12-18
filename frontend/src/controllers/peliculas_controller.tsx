
import Pelicula from "@/models/interface_pelicula";
import { Pelicula_model } from "@/models/pelicula_model";

class Pelicula_controller {
  private pelicula_model: Pelicula_model;
  private peliculas: Pelicula[] = [];
  
  constructor() {
    console.log("Pelicula_controller...");
    this.pelicula_model = new Pelicula_model();
  }

  async Traer_peliculas(token: string): Promise<boolean> {
    console.log("Pelicula_controller; FUNCION: Traer_peliculas()");
    try {
      const response: Response = await this.pelicula_model.Cargar_peliculas(token);
      const data = await response.json();
      console.log("data.resultado: ", data.resultado);
      this.peliculas = data.resultado;
      if (data.success === true) {
        console.log("Se han traido exitosamente las peliculas.");
        return true;
      } else {
        console.log("Error al traer peliculas. ");
        return false;
      }
    } catch (error) {
      console.error("Error al intentar traer peliculas: ", /*error*/);
      return false;
    }
  }

  get_peliculas(){
    return this.peliculas
  }

  async Actualizar_pelicula(pelicula: Pelicula): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Actualizar_pelicula()");
    //const result : boolean = await this.pelicula_model.actualizar(pelicula);
    //return result
    return true;
  }

  async Borrar_pelicula(pelicula: Pelicula): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Actualizar_pelicula()");
    //const result : boolean = await this.pelicula_model.borrar(pelicula);
    //return result
    return true;
  }

  async Subir_pelicula(pelicula: Pelicula): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Actualizar_pelicula()");
    //const result : boolean = await this.pelicula_model.subir(pelicula);
    //return result
    return true;
  }
}

export { Pelicula_controller };