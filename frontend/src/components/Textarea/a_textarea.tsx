import React, { useState } from 'react';
import { TextareaAutosize } from '@mui/material';
import { plantilla_tipo_1} from './b_style';

interface Area_props {
  defecto:string;
  texto: string;
  estilo: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; // Ajustado a un solo argumento (el valor del textarea)
}

function TextareaAutosize_custom({ defecto, texto, estilo, onChange }: Area_props) {

  return (
    <TextareaAutosize placeholder={defecto} value={texto} 
      style={plantilla_tipo_1[estilo]}  maxLength={340} onChange={onChange} />
  );
}

export { TextareaAutosize_custom };
