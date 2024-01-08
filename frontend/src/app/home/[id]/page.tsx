// pages/[id].js
"use client"
import React from 'react';
import style from './style.module.css';
import { Boton } from '@/components/botones/a_Botones';
import { CustomCard_register } from '@/components/cards/a_custom_card';
import { Props } from './interface';
import { useParams } from 'next/navigation';
import { usePeliculaController } from '@/controllers/pelicula_context';
import { Pelicula } from '../../../models/interface_pelicula';
import { useState } from 'react';

function Dinamico({ params}: Props) {
  //const param_hook = useParams(); //hook
  const pos = parseInt(params.id);      // si es una page usa params, si un component usa el hook

  function defecto():Pelicula{
    console.log("PAGE: Dinamico; FUNCTION: defecto()")
    const peliculaController = usePeliculaController();
    let peliculas: Pelicula[] = peliculaController.get_peliculas();
    let movie = peliculas.find(m => m.id === pos);
    console.log("pelicula encontrada: ", movie)
    if(movie!= undefined){
      return movie
    } else {
      const defecto: Pelicula = {
        ruta: "/testing.png",
        nombre: "No ha seleccionado ninguna película",
        sinopsis: "No ha seleccionado ninguna película",
        anio_lanzamiento: 0,
      };
      return defecto
    }
  }

  let pelicula_inicial = defecto()

  const [peli, setPeli] = useState<Pelicula>(pelicula_inicial); // esto es asincrono y renderiza todo el componente cuando se ejecuta.
  const [archivo, setArchivo] = useState<File | undefined>(undefined);

  function handlePeliChange(nuevaPelicula: Pelicula) {
    setPeli(nuevaPelicula);
  }

  function handleFileChange(nuevoArchivo: File) {
    setArchivo(nuevoArchivo);
  }
  //deberia mandar el archivo desde aca al componente boton actualizar para asi poder subir la imagen....
  return (
    <>
      <div className={style.fondo}>
        <div className={style.contenedor_centrado}>
          <div className={style.tarjeta}>
            <CustomCard_register llamada='editar_imagen_' pelicula={peli} onChange={handlePeliChange} onFileChange={handleFileChange}  /> 
          </div>
          <div className={style.boton}>
            <Boton llamada={'actualizar_pelicula_'} texto="Actualizar" estilo={2} peliculaData={peli} peliculaData_default={peli} archivo={archivo} />
            <Boton llamada={'borrar_pelicula_'} texto="Eliminar" estilo={2} peliculaData={peli} archivo={archivo} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dinamico;
