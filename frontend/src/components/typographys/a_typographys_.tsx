'use client';
import React from 'react';
import { Input_props } from './interface';
import { Typography } from '@mui/material';
import { plantilla } from './b_style';

function Tipografia1({ texto, estilo }: Input_props) {
  const seleccion = plantilla[estilo];

  return (
    <Typography align='center' style={seleccion} component="h1" variant="h3">
      {texto}
    </Typography>
  );
}

export { Tipografia1 };
