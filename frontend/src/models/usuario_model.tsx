import { Response_login, Usuario_bd } from "./interface_usuario";

export class Usuario_model {

  private backendUrl: string = "http://localhost:4000/api/usuario/login";
  /*
    username: string;
    password: string;
    rol:string;
    token?: string;
    id?: number;
  */
  private datos: Usuario_bd;

  constructor(usuario_: Usuario_bd) {
    console.log("MODEL: Usuario_model...");
    this.datos = usuario_;
    this.cargar_token();
  }

  async model_iniciar_sesion(): Promise<Response> {
    console.log("MODEL: Usuario_model; FUNCTION: model_iniciar_sesion()");
    const { username, password, rol } = this.datos;
    const userJSON = JSON.stringify({ username, password, rol });
    const cabecera = {'Content-Type': 'application/json'}; 
    const metodo = 'POST';
    //http en angular
    //fetch devuelve una promesa<Response>
    try {
      const respuesta = await fetch(this.backendUrl, { method: metodo, headers: cabecera, body: userJSON });
      console.log("respuesta: ", respuesta)
      if (!respuesta.ok) {
        // Si la respuesta no está en el rango 200-299, lanzar un error
        throw new Error(`Error al iniciar sesión: ${respuesta.status} - ${respuesta.statusText}`);
      } else {
        return respuesta;
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", /*error*/);
      throw new Error("Error al iniciar sesión");
    }
  }

  public save_token(token: string): void {
    console.log("MODEL: Usuario_model; FUNCTION: save_token()");
    this.datos.token=token;
    localStorage.setItem("token", token);
    const result=localStorage.getItem("token");
    console.log("Se ha guardado el siguiente token: ", result)
  }

  private cargar_token(): void {
    console.log("MODEL: Usuario_model; FUNCTION: cargar_token()");
    const result=localStorage.getItem("token");
    if(result!=null){
      console.log("El token es: ", result)
      this.datos.token=result
    } else {
      console.log("El token es: ", result)
    }
  }
  
  
}

