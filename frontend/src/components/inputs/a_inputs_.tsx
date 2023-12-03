'use client';
import React from 'react';
import { Input_props } from './interface';
import { TextField } from '@mui/material';
import { plantilla_tipo_1 } from './b_style';

function Input_custom({ texto, estilo }: Input_props) {
  const seleccion1 = plantilla_tipo_1[estilo];

  return (
    <TextField style={seleccion1} id={texto} label={texto} variant='filled' required fullWidth autoFocus />
  );
}

function Input_custom_register({ texto, estilo }: Input_props) {
  const seleccion1 = plantilla_tipo_1[estilo];

  return (
    <TextField style={seleccion1} placeholder={texto} id={texto} variant='filled' required fullWidth autoFocus color="secondary" />
  );
}

export { Input_custom, Input_custom_register };