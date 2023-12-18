// app/components/card/card.tsx
import React from 'react';
import { Typography } from '@mui/material';
import { ImageButton } from '../botones/a_Botones';
import { plantilla_tipo_1, plantilla_tipo_2, plantilla_tipo_3 } from './style'
import { Input_custom_register } from '../inputs/a_inputs_';
import { TextareaAutosize_custom } from '../Textarea/a_textarea';
import style from './b_style.module.css';

import { Props, Props1 } from './interface';
import Link from 'next/link';

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
          Fecha de lanzamiento: {pelicula.fecha}
        </Typography>
      </div>
    </article>
  );
}
//quede aqui error pelicula.ruta
function CustomCard_register({llamada, pelicula }: Props1) {
  return (
    <article className={style.div_card}>
      <div className={style.div_boton}>
        <ImageButton llamada={llamada} ruta={pelicula.ruta || ''} />
      </div>
      <div className={style.div_info}>
        <Input_custom_register texto={pelicula.nombre} estilo={2} />
        <TextareaAutosize_custom texto={pelicula.sinopsis} estilo={0} />
        <Input_custom_register texto={pelicula.fecha} estilo={4} />
      </div>
    </article>
  );
}


export { CustomCard, CustomCard_register };
