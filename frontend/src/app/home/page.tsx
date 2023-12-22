// app/home/page.tsx
"use client";
import Data_testing from '@/constantes/data';

import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import { Grid1 } from '@/components/grids/grids_';
import { Pelicula } from '@/models/interface_pelicula';
import { usuario_controller_singleton } from '@/controllers/usuario_controller';
import { Usuario_bd } from '@/models/interface_usuario';
import { usePeliculaController } from '@/controllers/pelicula_context';
import { useRouter } from 'next/navigation';
import { Usuario_model } from '@/models/usuario_model';

function Home() {
  console.log("PAGE: Home; ");

  const [testData, setTestData] = useState<Pelicula[]>([]);
  const peliculaController = usePeliculaController();
  const router = useRouter();

  useEffect(() => {
    console.log("PAGE: Home; arrow function useEffect");
    
    async function fetchData() {
      let resultado: boolean = await peliculaController.Traer_peliculas();
      console.log("¿Se han traido las peliculas exitosamente?: ", resultado)
      if(resultado==false){
        console.log("no se han podido obtener las peliculas dirigiendo al login...")
        router.push('/');
      } else {
        let peliculas: Pelicula[] = peliculaController.get_peliculas();
        console.log("data peliculas: ", peliculas)
        setTestData(peliculas);
      }
    }

    fetchData();
  }, [peliculaController, router]);

  return (
    <>
      <div className={style.contenedor_centrado}>
        <Grid1 Data={testData} />
      </div>
    </>
  );
}

export default Home;

/*

  useEffect(() => {
    console.log("---------------------------")
    setTestData(Data_testing);
    const user = usuarioController.obtenerUsuarioModel();
    console.log("user: ", user);
    if (user === undefined) {
      console.log("El usuario es undefined.")
      const usuario: Usuario_bd = {
        username: "",
        password: "",
      };
      usuarioController.setUsuarioModel(usuario);
      const newUser = usuarioController.obtenerUsuarioModel();
      console.log("user step2: ", newUser);
    }
  }, [usuarioController]); // Agrega usuarioController al array de dependencias
*/