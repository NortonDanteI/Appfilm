'use client';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { plantilla_tipo_1 } from './b_style';

interface Input_props {
  defecto: string;
  texto: string;
  estilo: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Nueva propiedad onChange
}


function Input_custom({ texto, estilo, onChange }: Input_props) {
  const seleccion1 = plantilla_tipo_1[estilo];

  return (
    <TextField placeholder={texto} onChange={onChange}
      style={seleccion1} variant='filled' required fullWidth autoFocus
    />
  );
}

function Input_custom_register({ defecto, texto, estilo, onChange }: Input_props) {
  const seleccion1 = plantilla_tipo_1[estilo];

  return (
    <TextField placeholder={defecto} value={texto} onChange={onChange}
      style={seleccion1} variant='filled' required fullWidth autoFocus color="secondary"
    />
  );
}

interface Input_props_number {
  numeros: number;
  estilo: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input_custom_register_number({ numeros, estilo, onChange }: Input_props_number) {
  const seleccion1 = plantilla_tipo_1[estilo];

  function handle(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    //onChange
  }

  return (
    <TextField value={numeros} onChange={handle}
      type="number" style={seleccion1} variant='filled' required fullWidth autoFocus color="secondary"
    />
  );
}

export { Input_custom, Input_custom_register, Input_custom_register_number };
