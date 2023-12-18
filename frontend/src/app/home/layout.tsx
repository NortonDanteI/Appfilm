// app/home/layout.tsx
"use client"
import Nav_bar from "@/components/nav_bar/nav_bar_";
import React from "react";
import style from './style.module.css';
import Provider_pelicula from "@/components/providers/provider_pelicula";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider_pelicula>
        <div className={style.fondo} >
          <div className={style.contenedor_superior}>
            <Nav_bar />
          </div>
          <div className={style.contenedor_inferior}>
            {children}
          </div>
        </div>
      </Provider_pelicula>
    </>
  );
}

export default HomeLayout;
