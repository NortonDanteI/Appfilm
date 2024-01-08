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