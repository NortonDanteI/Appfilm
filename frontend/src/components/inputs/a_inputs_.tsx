'use client';
import React from 'react';
import { TextField } from '@mui/material';
import { plantilla_tipo_1 } from './b_style';

interface Input_props {
  texto: string;
  estilo: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Nueva propiedad onChange
}

function Input_custom({ texto, estilo, onChange }: Input_props) {
  const seleccion1 = plantilla_tipo_1[estilo];

  return (
    <TextField
      style={seleccion1}
      id={texto}
      name={texto}
      placeholder={texto}
      variant='filled'
      required
      fullWidth
      autoFocus
      onChange={onChange} // Pasa la función onChange al evento onChange del TextField
    />
  );
}

function Input_custom_register({ texto, estilo, }: Input_props) {
  const seleccion1 = plantilla_tipo_1[estilo];

  return (
    <TextField
      style={seleccion1}
      placeholder={texto}
      id={texto}
      variant='filled'
      required
      fullWidth
      autoFocus
      color="secondary"

    />
  );
}

export { Input_custom, Input_custom_register };