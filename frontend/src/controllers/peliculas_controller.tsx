
import { Pelicula, PeliculaDB, Response_json } from "@/models/interface_pelicula";
import { Usuario_bd } from "@/models/interface_usuario";
import { Pelicula_model } from "@/models/pelicula_model";
import { Usuario_model } from "@/models/usuario_model";
import { usuario_controller_singleton } from "./usuario_controller";

class Pelicula_controller {
  private pelicula_model: Pelicula_model;
  private peliculas: Pelicula[] = [];

  constructor() {
    console.log("Pelicula_controller...");
    this.pelicula_model = new Pelicula_model();
  }

  async Traer_peliculas(): Promise<boolean> {
    console.log("Pelicula_controller; FUNCION: Traer_peliculas()");
    try {
      let token = this.call_token()
      if(token==""){
        return false
      } else {
        const response: Response = await this.pelicula_model.Cargar_peliculas(token);
        const response_json: Response_json = await response.json();
        console.log("response_json: ", response_json)
        this.peliculas = this.custom_parser(response_json)
        console.log("this.peliculas: ",this.peliculas)
        if (response_json.success === true) {
          console.log("Se han traido exitosamente las peliculas.");
          return true;
        } else {
          console.log("Error al traer peliculas. ");
          return false;
        }
      }
    } catch (error) {
      console.error("Error al intentar traer peliculas: ", /*error*/);
      return false;
    }
  }

  custom_parser(response_json: Response_json) {
    let pelicula_db: PeliculaDB[] = response_json.resultado;
    this.peliculas = [];
    
    for (let i = 0; i < pelicula_db.length; i++) {
      const aux_pelicula = pelicula_db[i];

      let aux_parser: Pelicula = {
        id: aux_pelicula.id,
        ruta: aux_pelicula.ruta || "",
        nombre: aux_pelicula.nombre,
        sinopsis: aux_pelicula.sinopsis || "",
        anio_lanzamiento: aux_pelicula.anio_lanzamiento || 0,
      };

      this.peliculas[i] = aux_parser;
    }
    return this.peliculas
  }

  get_peliculas() {
    return this.peliculas
  }

  async Actualizar_pelicula(pelicula: Pelicula): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Actualizar_pelicula()");
    try {
      let token = this.call_token()
      if (token != "") {
        const response: Response = await this.pelicula_model.Update_peliculas(token, pelicula);
        const response_json: Response_json = await response.json();
        console.log("response_json: ", response_json)
        this.custom_parser(response_json)

        if (response_json.success === true) {
          console.log("Se han traido exitosamente las peliculas.");
          return true;
        } else {
          console.log("Error al traer peliculas. ");
          return false;
        }
      } else {
        console.log("token no válido...")
        return false
      }

    } catch (error) {
      console.error("Error al intentar traer peliculas: ", /*error*/);
      return false;
    }
  }

  async Borrar_pelicula(pelicula: Pelicula): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Borrar_pelicula()");
    try {
      let token = this.call_token()
      if (token !== "") {
        const response: Response = await this.pelicula_model.borrarPelicula(token, pelicula);
        const response_json: Response_json = await response.json();
        console.log("response_json: ", response_json)
        this.custom_parser(response_json)
  
        if (response_json.success === true) {
          console.log("Se ha borrado exitosamente la película.");
          return true;
        } else {
          console.log("Error al borrar película.");
          return false;
        }
      } else {
        console.log("Token no válido...");
        return false;
      }
    } catch (error) {
      console.error("Error al intentar borrar la película: ", error);
      return false;
    }
  }
  
  async Registrar_pelicula(pelicula: Pelicula): Promise<boolean> {
    console.log("Usuario_controller; FUNCION: Borrar_pelicula()");
    console.log("pelicula:", pelicula)
    if(pelicula.nombre==''){
      alert("Ingrese un nombre válido...")
    } else {
      if(pelicula.sinopsis==''){
        alert("Ingrese una sinopsis válida...")
      } else {
        if(pelicula.anio_lanzamiento==0){
          alert("Ingrese un año válido...")
        }
      }
    }

    try {
      let token = this.call_token()
      if (token !== "") {
        const response: Response = await this.pelicula_model.registrarPelicula(token, pelicula);
        const response_json: Response_json = await response.json();
        console.log("response_json: ", response_json)
        this.custom_parser(response_json)
  
        if (response_json.success === true) {
          console.log("Se ha registrado exitosamente la película.");
          return true;
        } else {
          console.log("Error al registrado la película.");
          return false;
        }
      } else {
        console.log("Token no válido...");
        return false;
      }
    } catch (error) {
      console.error("Error al intentar registrado la película: ", error);
      return false;
    }
    
  }

  call_token(): string {
    var user_model: Usuario_model = usuario_controller_singleton.obtenerUsuarioModel();
    let data: Usuario_bd | null = user_model.get_user();
    if (data != null) {
      let token: string | undefined = data.token
      if (token != undefined) {
        return token
      } else {
        console.log("El token no esta definido...")
        return ""
      }
    } else {
      console.log("No hay usuario almacenado en el localstore...")
      return ""
    }
  }
}

export { Pelicula_controller };