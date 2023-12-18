// app/layout.tsx
import { roboto } from '@/fuentes/font';
//import style from './style.module.css';
import './style.css';
import React from 'react';

export const metadata = {
  title: "AppFilm - Inicio de seión",
  description: "Esta es la pagina principal de AppFilm",
  keywords: "CRUD, AppFilm, películas",
  creator: [{ name: 'Dante Irarrázabal' }],
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={roboto.className}>    
          {children}
      </body>
    </html>
  )
}

export default RootLayout;