import Peliculas from "@/models/interface_pelicula"
import Usuario from "@/models/interface_usuario"

export class Usuario_controller {

  constructor(/*modelo peliculas*/) {
    console.log("Usuario_controller...")
  }

  async Iniciar_sesion(usuario:Usuario): Promise<boolean>{
    console.log("Usuario_controller; FUNCION: Iniciar_sesion()")
    //const result : boolean = await this.pelicula_model.actualizar(pelicula);
    //return result
    return true
  }
  async Actualizar_pelicula(pelicula:Peliculas): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Actualizar_pelicula()")
    //const result : boolean = await this.pelicula_model.actualizar(pelicula);
    //return result
    return true
  }

  async Borrar_pelicula(pelicula:Peliculas): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Actualizar_pelicula()")
    //const result : boolean = await this.pelicula_model.borrar(pelicula);
    //return result
    return true
  }

  async Subir_pelicula(pelicula:Peliculas): Promise<boolean>{
    console.log("Usuario_controller; FUNCION: Actualizar_pelicula()")
    //const result : boolean = await this.pelicula_model.subir(pelicula);
    //return result
    return true
  }
}