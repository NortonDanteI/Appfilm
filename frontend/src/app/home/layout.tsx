// app/home/layout.tsx
import Nav_bar from "@/components/nav_bar/nav_bar_";
import React from "react";
import style from './style.module.css';

export const metadata = {
  title: "AppFilm - Escritorio",
  description: "Este es el escritorio para realizar CRUD",
  keywords: "CRUD, AppFilm, películas",
  creator: [{ name: 'Dante Irarrázabal' }]
}

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={style.fondo} >
        <div className={style.contenedor_superior}>
          <Nav_bar/>
        </div>
        <div className={style.contenedor_inferior}>
          {children}
        </div>
      </div>
    </>
  );
}

export default HomeLayout;
