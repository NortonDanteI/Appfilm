// app/components/boton/boton.tsx
'use client';
import React from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';
import { ImageButtonProps, Mapeo_de_funciones } from './interface';
import { plantilla_tipo_1, plantilla_boton } from './b_style'
import { useRouter } from 'next/navigation';
import { Usuario_bd } from '@/models/interface_usuario';
import { Usuario_controller } from '@/controllers/usuario_controller';

function default_on_click() {
  alert('Botón presionado');
};

//#region  boton normal

interface InputCustomProps {
  llamada:string;
  texto: string;
  estilo: number;
  usuarioData : Usuario_bd;
}

function Boton({ llamada, texto, estilo, usuarioData  }: InputCustomProps) {  
  const seleccion1 = plantilla_tipo_1[estilo];


  function registrar_pelicula() {
    alert('boton desde register');
  };

  function actualizar_pelicula() {
    alert('boton desde actualizar pelicula');
  };

  function borrar_pelicula() {
    alert('boton desde borrar pelicula');
  };
  const router = useRouter()
  async function ir_home() {
    // Crear una instancia de Usuario_bd con datos de ejemplo
    const usuario: Usuario_bd = {
      username: usuarioData.username,
      password: usuarioData.password,
      rol: 'Regular',
    };
    console.log("usuario: ", usuario)
    //Datos de consulta: username:  usuario_1 |password:  contrasenia |rol: Regular

    // Crear una instancia de Usuario_controller
    const usuarioController = new Usuario_controller(usuario);
    const result = await usuarioController.Iniciar_sesion();
    console.log("result: ",result)
    if(result==true){
      router.push('/home');
    } else {
      alert("Credenciales no válidas.")
    }
  }

  const functions: Mapeo_de_funciones = {
    ir_home_: ir_home,
    registrar_pelicula_: registrar_pelicula,
    actualizar_pelicula_: actualizar_pelicula,
    borrar_pelicula_: borrar_pelicula
  }
  let funcion = default_on_click;

  if (functions[llamada]) {
    funcion = functions[llamada];
  }

  return (
    <Button onClick={funcion} type="submit" fullWidth variant="contained" color="primary" style={seleccion1}>
      {texto}
    </Button>
  );
}
//#endregion


//#region boton con imagen
function ImageButton({ llamada, ruta }: ImageButtonProps) {

  function ver_peliculas() {
    alert('Boton con imagen desde el home');
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
  let funcion = default_on_click;

  if (functions[llamada]) {
    funcion = functions[llamada];
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
