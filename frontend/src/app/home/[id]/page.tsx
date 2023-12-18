// pages/[id].js
"use client"
import React from 'react';
import style from './style.module.css';
import { Boton } from '@/components/botones/a_Botones';
import { CustomCard, CustomCard_register } from '@/components/cards/a_cards';
import Peliculas from '../../../models/interface_pelicula';
import Data_testing from '@/constantes/data';
import { Props } from './interface';
import { useParams } from 'next/navigation';
import { usePeliculaController } from '@/controllers/pelicula_context';
import Pelicula from '../../../models/interface_pelicula';

/*
export default interface Pelicula {
  id?: number;
  ruta?: string;
  nombre: string;
  sinopsis: string;
  fecha: string;
}
*/
function Dinamico({ params, searchParams }: Props) {
  const pos = parseInt(params.id); // si es una pagina puede acceder si es un componente usa el hook
  const param = useParams();
  console.log("params.id: ",params,"| param hook: ", param);

  const peliculaController = usePeliculaController();
  let peliculas: Pelicula[] = peliculaController.get_peliculas();
  console.log("data peliculas: ", peliculas)

  //busca la pelicula que cumpla con el id de la pagina
  let movie = peliculas.find(m => m.id === pos);
  //pero que pasa si no la encuentra?: solucion-> construir algo por default?...

  if(movie==undefined){
    const defecto : Pelicula = {
      ruta: "/testing.png",
      nombre: "No ha seleccionado ninguna película",
      sinopsis: "No ha seleccionado ninguna película",
      fecha: "2023-12-12",
    };
    
    movie = defecto
  }

  return (
    <>
      <div className={style.fondo}>
        <div className={style.contenedor_centrado}>
          <div className={style.tarjeta}>
            <CustomCard_register llamada='editar_imagen_' pelicula={movie}/>
          </div>
          <div className={style.boton}>
            <Boton llamada={'actualizar_pelicula_'} texto="Actualizar" estilo={2}/>
            <Boton llamada={'borrar_pelicula_'} texto="Eliminar" estilo={2} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dinamico;
