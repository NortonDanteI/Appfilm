import Peliculas from "./interface_pelicula";


export class Pelicula_model {

  private peliculas: Peliculas[] = [];

  constructor(/* servicio de carga????*/) {
    console.log("MODEL: Ingesta...")
  }

  get_peliculas(){
    return this.peliculas;
  }

  async model_Subir_pelicula(pelicula:Peliculas): Promise<boolean> {
    
    console.log("MODEL: Ingesta ; FUNCION: Obtener_ingesta()");
    /*
    return new Promise<boolean>((resolve, reject) => {
      let token: string = this.auth.getToken();
      const observable: Observable<any> = this.pelicula_bd.POST_ingesta(token,data);
      observable.subscribe({
        next: (data:any) => {
          console.log("data pelicula: ", data);

          if (data.success === true) {
            resolve(true); // Resuelve la promesa con un valor si es necesario
          } else {
            reject(false); // Rechaza la promesa en caso de error
          }
        },
        error: (error: any) => {
          console.log(error)
          reject(false); // Rechaza la promesa en caso de error
        },
        complete: () => {
          console.log("completado con éxito la obtención de ingesta... ")
        }
      });
    });
    */
   return true
  }

}
