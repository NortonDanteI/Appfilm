import Peliculas from "@/models/interface_pelicula"
import { Response_login, Usuario_bd } from "@/models/interface_usuario"
import { Pelicula_model } from "@/models/pelicula_model";
import { Usuario_model } from "@/models/usuario_model";

export class Usuario_controller {
  //username, password, rol, token, id
  private usuarioModel: Usuario_model;
  private pelicula_model: Pelicula_model;
  private peliculas: Peliculas[] = [];

  constructor(usuario: Usuario_bd) {
    console.log("Usuario_controller...")
    this.usuarioModel = new Usuario_model(usuario);
    this.pelicula_model = new Pelicula_model;
  }

  async Iniciar_sesion(): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Iniciar_sesion()");
    try {
      const response: Response = await this.usuarioModel.model_iniciar_sesion();
      const data: Response_login = await response.json();
      console.log("data: ",data)
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
  
  async Traer_peliculas(): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Traer_peliculas()");
    try {
      let token :string = this.usuarioModel.get_token()
      const response: Response = await this.pelicula_model.Cargar_peliculas(token);
      const data: Response_login = await response.json();
      console.log("data: ",data)

      if (data.success === true) {
        this.usuarioModel.save_token(data.token)
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