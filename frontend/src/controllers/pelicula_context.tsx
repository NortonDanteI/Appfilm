// pelicula_context.tsx
import React, { createContext, useContext } from "react";
import { Pelicula_controller } from "./peliculas_controller";

export const PeliculaContext = createContext<Pelicula_controller | undefined>(undefined);

export function usePeliculaController() {
  const controlador = useContext(PeliculaContext);

  if (!controlador) {
    throw new Error('El Pelicula_controller es undefined porque lo estas llamando fuera de un Provider_pelicula.');
  }

  return controlador;
}