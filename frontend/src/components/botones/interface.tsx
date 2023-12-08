import React, { MouseEvent } from 'react';

interface ImageButtonProps {
  llamada:string;
  ruta: string;
}

interface RoundedButtonProps {
  llamada:string;
  texto:string;
  estilo:number;
  onChange: (value: string) => void;
  // Puedes añadir otras propiedades específicas para RoundedButton aquí
}

interface Mapeo_de_funciones {
  [key: string]: () => void;
}

export type { ImageButtonProps, RoundedButtonProps,Mapeo_de_funciones };