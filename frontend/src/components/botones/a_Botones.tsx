// app/components/boton/boton.tsx
'use client';
import React from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';
import { ImageButtonProps, Mapeo_de_funciones } from './interface';
import { plantilla_tipo_1, plantilla_boton } from './b_style'
import { useRouter } from 'next/navigation';
import { Usuario_bd } from '@/models/interface_usuario';
import { usuario_controller_singleton } from '@/controllers/usuario_controller'
import {Pelicula} from '@/models/interface_pelicula';
import { usePeliculaController } from '@/controllers/pelicula_context';

//#region  boton normal

interface InputCustomProps {
  llamada: string;
  texto: string;
  estilo: number;
  usuarioData?: Usuario_bd;
  peliculaData?: Pelicula;
}

function Boton({ llamada, texto, estilo, usuarioData, peliculaData }: InputCustomProps) {
  const seleccion1 = plantilla_tipo_1[estilo];
  const router = useRouter()
  let peliculaController = usePeliculaController();
  
  const functions: Mapeo_de_funciones = {
    ir_home_: ir_home,
    registrar_pelicula_: registrar_pelicula,
    actualizar_pelicula_: actualizar_pelicula,
    borrar_pelicula_: borrar_pelicula
  }

  function default_on_click() {
    alert('Botón presionado');
  };

  function registrar_pelicula() {
    alert('boton desde register');
  };

  async function actualizar_pelicula() {
    console.log("peliculaData: ",peliculaData)

    if(peliculaData!=undefined){
      let resultado: boolean = await peliculaController.Actualizar_pelicula(peliculaData);
      console.log("Se ha actualizado correctamente la pelicula: ", resultado)
    }

  };

  function borrar_pelicula() {
    alert('boton desde borrar pelicula');
  };

  async function ir_home() {

    if (usuarioData != undefined) {
      const usuario: Usuario_bd = {
        username: usuarioData.username,
        password: usuarioData.password,
      };
      console.log("usuario: ", usuario)
      const result = await usuario_controller_singleton.Iniciar_sesion(usuario);
      console.log("valido para ir home?: ", result)

      if (result == true) {
        router.push('/home');
      } else {
        alert("Credenciales no válidas.")
      }
    }
  }

  let funcion = functions[llamada] || default_on_click;

  return (
    <Button onClick={funcion} type="submit" fullWidth variant="contained" color="primary" style={seleccion1}>
      {texto}
    </Button>
  );
}
//#endregion


//#region boton con imagen
function ImageButton({ llamada, ruta }: ImageButtonProps) {

  function default_on_click() {
    alert('Botón presionado');
  };
  function ver_peliculas() {
    console.log('Boton con imagen desde el home');
  };
  function cargar_imagen() {
    alert('Boton con imagen desde register');
  };

  function editar_imagen() {
    alert('Boton con imagen desde editar');
  };

  const functions: Mapeo_de_funciones = {
    ver_peliculas_: ver_peliculas,
    cargar_imagen_: cargar_imagen,
    editar_imagen_: editar_imagen,
  }

  let funcion = functions[llamada] || default_on_click;

  if (ruta.startsWith("/") == false) {
    console.log("ruta no valida colocanco imagen por defecto...")
    ruta = "/testing.png";
  }

  return (
    <Button onClick={funcion} style={plantilla_boton}>
      <Image src={ruta} alt={ruta} fill sizes='500px' priority quality={100} />
    </Button>
  );
}
//#endregion


export { ImageButton, Boton };
//NEXT exige altura y anchura o size. 
