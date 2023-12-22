import { Response_login, Usuario_bd } from "./interface_usuario";

export class Usuario_model {
  private backendUrl: string = "http://localhost:4000/api/usuario/login";
  //username,password,rol?,token?,id?
  private datos: Usuario_bd;

  constructor(usuario_: Usuario_bd) {
    console.log("MODEL: Usuario_model...");
    this.datos = usuario_;
  }

  async model_iniciar_sesion(): Promise<Response> {
    console.log("MODEL: Usuario_model; FUNCTION: model_iniciar_sesion()");
    const { username, password } = this.datos;
    const userJSON = JSON.stringify({ username, password });
    const cabecera = { 'Content-Type': 'application/json' };
    const metodo = 'POST';
    try {
      const respuesta = await fetch(this.backendUrl, { method: metodo, headers: cabecera, body: userJSON });
      console.log("respuesta: ", respuesta)
      if (!respuesta.ok) {
        throw new Error(`Error al iniciar sesión: ${respuesta.status} - ${respuesta.statusText}`);
      } else {
        return respuesta;
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", /*error*/);
      throw new Error("Error al iniciar sesión");
    }
  }

  public clean_local(): boolean {
    console.log("MODEL: Usuario_model; FUNCTION: clean_local()");
    localStorage.removeItem('usuario');
    let local: Usuario_bd | null = this.get_user()
    if(local == null){
      return true
    } else {
      return false
    }
  }

  public save_user(usuario: Usuario_bd): void {
    console.log("MODEL: Usuario_model; FUNCTION: save_user()");
    this.datos = usuario;
    const usuarioJSON = JSON.stringify(this.datos);
    localStorage.setItem('usuario', usuarioJSON);
    let local: Usuario_bd | null = this.get_user()
    console.log("datos guardados: ", local)
  }

  public get_user(): Usuario_bd | null {
    console.log("MODEL: Usuario_model; FUNCTION: get_user()");
    const usuarioJSONStored: string | null = localStorage.getItem('usuario');
    if (usuarioJSONStored) {
      // Parsear la cadena JSON de nuevo a un objeto Usuario_bd
      const usuarioStored: Usuario_bd = JSON.parse(usuarioJSONStored);
      console.log("data del local username: ",usuarioStored.username ,"| token: ", usuarioStored.token);
      return usuarioStored
    } else {
      console.log('No se encontró información del usuario en localStorage');
      return null
    }
  }

}

