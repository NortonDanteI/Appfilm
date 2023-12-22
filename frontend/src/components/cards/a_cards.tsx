// app/components/card/card.tsx
import React from 'react';
import { Typography } from '@mui/material';
import { ImageButton } from '../botones/a_Botones';
import { plantilla_tipo_1, plantilla_tipo_2, plantilla_tipo_3 } from './style'
import { Input_custom_register, Input_custom_register_number } from '../inputs/a_inputs_';
import { TextareaAutosize_custom } from '../Textarea/a_textarea';
import style from './b_style.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { Pelicula } from "@/models/interface_pelicula";

export interface Props {
  llamada: string;
  pelicula: Pelicula;
  estilo: number;
}

export interface Props1 {
  llamada: string;
  pelicula: Pelicula;
  onChange: (pelicula: Pelicula) => void;
}

function CustomCard_register({ onChange,llamada, pelicula }: Props1) {
  let defecto_nombre = "Ingresa un nombre"
  let defecto_sinopsis = "Ingresa una sinopsis"
 
  const [peli, setPeli] = useState(pelicula);

  function handleNombreChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPeli((prevPeli) => ({ ...prevPeli, nombre: e.target.value }));
    onChange({ ...peli, nombre: e.target.value });
  }

  function handleSinopsisChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPeli((prevPeli) => ({ ...prevPeli, sinopsis: e.target.value }));
    onChange({ ...peli, sinopsis: e.target.value });
  }

  function handleAnioLanzamientoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value.trim();
    const nuevoNumero = /^\d+$/.test(inputValue) ? parseInt(inputValue, 10) : 0;
    setPeli((prevPeli) => ({ ...prevPeli, anio_lanzamiento: nuevoNumero }));
    //debe hacerse asi porque el setstate debe renderizarse para cojer el nuevo valor.
    onChange({ ...peli, anio_lanzamiento: nuevoNumero });
    e.target.value = nuevoNumero.toString();
  }

  return (
    <article className={style.div_card}>
      <div className={style.div_boton}>
        <ImageButton llamada={llamada} ruta={pelicula.ruta || ''} />
      </div>
      <div className={style.div_info}>
        <Input_custom_register defecto={defecto_nombre} texto={peli.nombre} estilo={2} onChange={handleNombreChange} />
        <TextareaAutosize_custom defecto={defecto_sinopsis} texto={peli.sinopsis} estilo={0} onChange={handleSinopsisChange} />
        <Input_custom_register_number numeros={peli.anio_lanzamiento} estilo={4} onChange={handleAnioLanzamientoChange} />
      </div>
    </article>
  );
}

function CustomCard({ llamada, pelicula, estilo }: Props) {
  const seleccion1 = plantilla_tipo_1[estilo];
  const seleccion2 = plantilla_tipo_2[estilo];
  const seleccion3 = plantilla_tipo_3[estilo];

  var ruta_ = ''
  if (pelicula.ruta != undefined) { ruta_ = pelicula.ruta }

  return (
    <article className={style.div_card}>
      <Link className={style.div_boton} href={`/home/${pelicula.id}`}>
        <ImageButton llamada={llamada} ruta={ruta_} />
      </Link>
      <div className={style.div_info}>
        <Typography justifyContent={"center"} alignItems={"center"} textAlign={"center"} variant="h6" style={seleccion1}>
          {pelicula.nombre}
        </Typography>
        <Typography variant="h6" style={seleccion2}>
          {pelicula.sinopsis}
        </Typography>
        <Typography variant="h6" style={seleccion3}>
          Año de lanzamiento: {pelicula.anio_lanzamiento}
        </Typography>
      </div>
    </article>
  );
}

export { CustomCard, CustomCard_register };