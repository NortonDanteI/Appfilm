// app/home/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import { Grid1 } from '@/components/grids/grids_';
import Peliculas from '@/models/interface_pelicula';
import Data_testing from '@/constantes/data';
import { usuarioController } from '@/controllers/usuario_controller';
import { Usuario_bd } from '@/models/interface_usuario';
import { usePeliculaController } from '@/controllers/pelicula_context';
import { useRouter } from 'next/navigation';
import { Usuario_model } from '@/models/usuario_model';

function Home() {
  console.log("PAGE: Home; ");

  const [testData, setTestData] = useState<Peliculas[]>([]);
  const peliculaController = usePeliculaController();
  const router = useRouter();

  useEffect(() => {
    console.log("PAGE: Home; arrow function useEffect");

    async function fetchData() {
      var user_model: Usuario_model | undefined = usuarioController.obtenerUsuarioModel();
      //si el usuario no esta definido, inicializar.
      if (user_model === undefined) {
        console.log("Inicializando usuario...");
        const usuario: Usuario_bd = { username: "", password: "" };
        usuarioController.setUsuarioModel(usuario);
        user_model = usuarioController.obtenerUsuarioModel();
      } else { 
        console.log("Ya existe un usuario en el controller, no necesita inicializar.") 
      }

      //si el usuario esta difinido...
      if (user_model != undefined) {
        let data: Usuario_bd | null = user_model.get_user();
        if (data != null) {
          let token: string | undefined = data.token
          if (token != undefined) {
            console.log("Token del usuario: ", token);
            let resultado: boolean = await peliculaController.Traer_peliculas(token);
            console.log("¿Se han traido las peliculas exitosamente?: ", resultado)
            let peliculas = peliculaController.get_peliculas();
            console.log("data peliculas: ", peliculas)
            setTestData(peliculas);
          } else {
            console.log("El token no esta definido...")
          }
        } else {
          console.log("No hay usuario almacenado en el localstore...")
        }
      } else {
        console.log("el usuario es undefined...")
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