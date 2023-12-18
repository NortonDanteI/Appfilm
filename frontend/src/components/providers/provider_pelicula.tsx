//provider_pelicula.tsx
import React from 'react';
import { Pelicula_controller } from '@/controllers/peliculas_controller';
import { PeliculaContext } from '@/controllers/pelicula_context';

function Provider_pelicula({ children }: { children: React.ReactNode }) {
  const instancia = new Pelicula_controller();

  return (
    <PeliculaContext.Provider value={instancia}>
      {children}
    </PeliculaContext.Provider>
  );
}

export default Provider_pelicula;

























/*
desestructuracion + flecha
export const ProviderPelicula = ({ children }: { children: React.ReactNode }) => {
  const instancia = new Pelicula_controller();

  return (
    <PeliculaContext.Provider value={instancia}>
      {children}
    </PeliculaContext.Provider>
  );
};

flecha
export const PeliculaProvider = ( children :  React.ReactNode  ) => {
  // Crea una nueva instancia de Pelicula_controller
  const instancia = new Pelicula_controller();

  return (
    <PeliculaContext.Provider value={instancia}>
      {children}
    </PeliculaContext.Provider>
  );
};
*/