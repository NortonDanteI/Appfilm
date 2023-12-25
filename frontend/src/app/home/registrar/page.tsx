"use client"
import React from 'react';
import style from './style.module.css';
import { Boton } from '@/components/botones/a_Botones';
import { CustomCard_register } from '@/components/cards/a_cards';
import { usePeliculaController } from '@/controllers/pelicula_context';
import { Pelicula } from '../../../models/interface_pelicula';
import { useState } from 'react';

function Registrar() {

  function defecto():Pelicula{
    console.log("PAGE: Dinamico; FUNCTION: defecto()")
    const defecto: Pelicula = {
      ruta: "/testing.png",
      nombre: "",
      sinopsis: "",
      anio_lanzamiento: 0,
    };
    return defecto
  }

  let pelicula_inicial: Pelicula = defecto()

  const [peli, setPeli] = useState<Pelicula>(pelicula_inicial); // esto es asincrono y renderiza todo el componente cuando se ejecuta.
  function handlePeliChange(nuevaPelicula: Pelicula) {
    setPeli(nuevaPelicula);
  }

  return (
    <>
      <div className={style.fondo}>
        <div className={style.contenedor_centrado}>
          <div className={style.tarjeta}>
            <CustomCard_register llamada='cargar_imagen_' pelicula={peli} onChange={handlePeliChange} />
          </div>
          <div className={style.boton}>
            <Boton llamada={'registrar_pelicula_'} texto="Registrar" estilo={2} peliculaData={peli}/>
          </div>
        </div>
      </div>

    </>
  );
}

export default Registrar;