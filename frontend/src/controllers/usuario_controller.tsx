import { Response_login, Usuario_bd } from "@/models/interface_usuario";
import { Usuario_model } from "@/models/usuario_model";

export class Usuario_controller {
  private static instancia: Usuario_controller | null = null;
  private usuarioModel: Usuario_model | undefined;

  private constructor() {
    console.log("Usuario_controller...");
  }

  // Método para obtener la instancia única o crear una si no existe
  public static obtenerInstancia(): Usuario_controller {
    if (!Usuario_controller.instancia) {
      Usuario_controller.instancia = new Usuario_controller();
    }
    return Usuario_controller.instancia;
  }

  public obtenerUsuarioModel(): Usuario_model | undefined {
    console.log("Usuario_controller; obtenerUsuarioModel()");
    return this.usuarioModel;
  }

  public setUsuarioModel(usuario_: Usuario_bd) {
    console.log("Usuario_controller; setUsuarioModel()");
    this.usuarioModel = new Usuario_model(usuario_)
  }

  async Iniciar_sesion(usuario: Usuario_bd): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Iniciar_sesion()");
    this.usuarioModel = new Usuario_model(usuario);

    try {
      const response: Response = await this.usuarioModel.model_iniciar_sesion();
      const data: Response_login = await response.json();
      console.log("data: ", data);
      if (data.success === true) {
        usuario.token = data.token
        this.usuarioModel.save_user(usuario);
        console.log("Inicio de sesión exitoso");
        return true;
      } else {
        console.log("Inicio de sesión fallido");
        return false;
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      return false;
    }
  }
}

// Exporta la instancia única
export const usuarioController = Usuario_controller.obtenerInstancia();
