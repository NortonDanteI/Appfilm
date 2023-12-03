'use client';
import React from 'react';
import { Input_props } from './interface';
import { plantilla_tipo_1, grey, azul } from './b_style';
import { styled } from '@mui/system';
import { TextareaAutosize } from '@mui/material';


function TextareaAutosize_custom({ texto, estilo }: Input_props) {
  const TextareaAutosize_ = styled(TextareaAutosize)(({ theme }) =>
    `
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      &:hover {
        border-color: ${azul[400]};
      }
      &:focus {
        outline: 0;
        border-color: ${azul[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? azul[600] : azul[200]};
      }
    `,
  );

  const seleccion1 = plantilla_tipo_1[estilo];

  return (
    <TextareaAutosize_ style={seleccion1} defaultValue= {texto} placeholder={texto} maxLength={340} /> 
  );
}

export { TextareaAutosize_custom };