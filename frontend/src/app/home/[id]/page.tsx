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

function Dinamico({ params, searchParams }: Props) {
  const pos = parseInt(params.id); // si es una pagina puede acceder si es un componente usa el hook
  const param = useParams();

  console.log("params.id: ",params,"| param.id: ", param);

  let testData: Peliculas[] = Data_testing;

  let movie = testData.find(m => m.id === pos);
  if(movie==undefined){
    movie = testData[0]
  }

  return (
    <>
      <div className={style.fondo}>
        <div className={style.contenedor_centrado}>
          <div className={style.tarjeta}>
            <CustomCard_register llamada='editar_imagen_' pelicula={movie}/>
          </div>
          <div className={style.boton}>
            <Boton llamada={'actualizar_pelicula_'} texto="Actualizar" estilo={2} />
            <Boton llamada={'borrar_pelicula_'} texto="Eliminar" estilo={2} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dinamico;
