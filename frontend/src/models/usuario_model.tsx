import Usuario from "./interface_usuario";


export class Usuario_model {

  private usuario: Usuario;

  constructor(usuario_:Usuario) {
    this.usuario=usuario_;
    console.log("MODEL: Usuario...")
  }

  async model_iniciar_sesion(): Promise<boolean> {
    
    console.log("MODEL: Usuario ; FUNCION: model_iniciar_sesion()");
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
