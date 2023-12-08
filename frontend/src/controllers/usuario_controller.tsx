import Peliculas from "@/models/interface_pelicula"
import { Response_login, Usuario_bd } from "@/models/interface_usuario"
import { Usuario_model } from "@/models/usuario_model";

/*
  username: string;
  password: string;
  rol:string;
  token?: string;
  id?: number;
*/
export class Usuario_controller {
  private usuarioModel: Usuario_model;

  constructor(usuario: Usuario_bd) {
    console.log("Usuario_controller...")
    this.usuarioModel = new Usuario_model(usuario);
  }

  async Iniciar_sesion(): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Iniciar_sesion()");
    try {
      const response: Response = await this.usuarioModel.model_iniciar_sesion();
      const data: Response_login = await response.json();
      console.log("data: ",data)
      // Asumiendo que Response_login tiene una propiedad 'success' que indica si la autenticación fue exitosa
      if (data.success === true) {
        this.usuarioModel.save_token(data.token)
        console.log("Inicio de sesión exitoso");
        return true;
      } else {
        console.log("Inicio de sesión fallido");
        return false;
      }
  
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", /*error*/);
      // Puedes manejar el error según tus necesidades, por ejemplo, lanzando un nuevo error personalizado o devolviendo un valor predeterminado.
      return false;
    }
  }
  

  async Actualizar_pelicula(pelicula: Peliculas): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Actualizar_pelicula()")
    //const result : boolean = await this.pelicula_model.actualizar(pelicula);
    //return result
    return true
  }

  async Borrar_pelicula(pelicula: Peliculas): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Actualizar_pelicula()")
    //const result : boolean = await this.pelicula_model.borrar(pelicula);
    //return result
    return true
  }

  async Subir_pelicula(pelicula: Peliculas): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Actualizar_pelicula()")
    //const result : boolean = await this.pelicula_model.subir(pelicula);
    //return result
    return true
  }
}