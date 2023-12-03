import React from 'react';
import style from './style.module.css';
import { Boton } from '@/components/botones/a_Botones';
import { CustomCard_register } from '@/components/cards/a_cards';
import Pelicula from '@/models/interface_pelicula';

function Registrar() {

  let movie: Pelicula = {
    ruta:"/testing.png",
    nombre: "Nombre de la película",
    sinopsis: "Sinopsis de la película",
    fecha: "Fecha de lanzamiento",
  };
  
  return (
    <>
      <div className={style.fondo}>
        <div className={style.contenedor_centrado}>
          <div className={style.tarjeta}>
            <CustomCard_register llamada='cargar_imagen_' pelicula={movie} />
          </div>
          <div className={style.boton}>
            <Boton llamada={'registrar_pelicula_'} texto="Registrar" estilo={2} />
          </div>
        </div>
      </div>

    </>
  );
}

export default Registrar;