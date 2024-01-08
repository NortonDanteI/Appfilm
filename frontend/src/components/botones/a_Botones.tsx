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
import { Pelicula } from '@/models/interface_pelicula';
import { usePeliculaController } from '@/controllers/pelicula_context';
import { useState } from 'react';
import { ChangeEvent } from 'react';
//#region  boton normal

interface InputCustomProps {
  llamada: string;
  texto: string;
  estilo: number;
  usuarioData?: Usuario_bd;
  peliculaData?: Pelicula;
  peliculaData_default?: Pelicula;
  archivo?: File;
}

function Boton({ llamada, texto, estilo, usuarioData, peliculaData, peliculaData_default, archivo }: InputCustomProps) {
  const seleccion1 = plantilla_tipo_1[estilo];
  const router = useRouter()
  let peliculaController = usePeliculaController();

  const functions: Mapeo_de_funciones = {
    ir_home_: ir_home,
    registrar_pelicula_: registrar_pelicula,
    actualizar_pelicula_: actualizar_pelicula,
    borrar_pelicula_: borrar_pelicula
  }

  async function actualizar_pelicula() {
    async function data_up() {
      let flag = true
      if (peliculaData?.nombre !== peliculaData_default?.nombre) {
        console.log('Diferentes: nombre');
      } else if (peliculaData?.anio_lanzamiento !== peliculaData_default?.anio_lanzamiento) {
        console.log('Diferentes: anio_lanzamiento');
      } else if (peliculaData?.sinopsis !== peliculaData_default?.sinopsis) {
        console.log('Diferentes: sinopsis');
      } else {
        console.log('No hay cambios en la data de pelicula.');
        flag = false
      }
      // Si hay algun campo diferente entonces realiza el cambio
      if (flag == true) {
        //actualizar informacion de la pelicula
        console.log("peliculaData: ", peliculaData)
        if (peliculaData != undefined) {
          let resultado: boolean = await peliculaController.Actualizar_pelicula(peliculaData);
          console.log("Se ha actualizado correctamente la pelicula: ", resultado)
        }
      }
    }
    async function picture_up() {
      // Subir imagen de la película - Si hay un archivo entonces realiza el cambio
      if (archivo != undefined && peliculaData != undefined) {
        const formData = new FormData();
        formData.append('nombre_sustituto', peliculaData.nombre.toString());
        formData.append('archivo', archivo);
        // Enviar FormData al controlador
        let resultado = await peliculaController.Subir_caratula(formData);
        console.log("Se ha subido el archivo correctamente: ", resultado);
      } else {
        console.log("No hay picture nueva...");
      }
    }
    
    
    data_up()
    picture_up()
  };

  function default_on_click() {
    alert('Botón presionado');
  };

  async function registrar_pelicula() {
    if (peliculaData != undefined) {
      let resultado: boolean = await peliculaController.Registrar_pelicula(peliculaData);
      console.log("Se ha registrado correctamente la pelicula: ", resultado)
      if (resultado == true) {
        router.push('/home');
      }
    }
  };

  async function borrar_pelicula() {
    console.log("peliculaData: ", peliculaData)

    if (peliculaData != undefined) {
      let resultado: boolean = await peliculaController.Borrar_pelicula(peliculaData);
      console.log("Se ha borrado correctamente la pelicula: ", resultado)
      if (resultado == true) {
        router.push('/home');
      }
    }
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
function ImageButton({ llamada, ruta, onFileChange }: ImageButtonProps) {
  const [imagenRuta, setImagenRuta] = useState(ruta || '/testing.png');

  const default_on_click = () => {
    alert('Botón presionado');
  };

  const ver_peliculas = () => {
    console.log('Boton con imagen desde el home');
  };

  const cargar_imagen = () => {
    alert('Boton con imagen desde register');
  };

  const editar_imagen = () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement)?.files;

      if (files && files.length > 0) {
        const file = files[0];

        if (file.type.startsWith('image/')) {
          const nuevo = URL.createObjectURL(file);
          setImagenRuta(nuevo);
          if (onFileChange != undefined) {
            onFileChange(file);
          }
        } else {
          alert('Por favor, selecciona un archivo de imagen válido.');
        }
      }
    };
    input.click();
  };

  const functions: Record<string, () => void> = {
    ver_peliculas_: ver_peliculas,
    cargar_imagen_: cargar_imagen,
    editar_imagen_: editar_imagen,
  };

  const funcion = functions[llamada] || default_on_click;

  if (!ruta) {
    console.log('Ruta no válida, colocando imagen por defecto...');
    ruta = '/testing.png';
  }

  let full_url: string = '/testing.png'; // Inicializamos con un valor predeterminado
    
  if (imagenRuta !== '/testing.png') {
    const base_url = 'http://localhost:4000/';
    const folder_url = 'permanente/';
    const folderUrlInstance = new URL(folder_url, base_url);
    let fullUrlInstance: URL;
    
    console.log("imagenRuta: ", imagenRuta);
    
    if (imagenRuta.startsWith("blob:")) {
      console.log("la ruta comienza con blob es decir se ha seleccionado desde file.");
      fullUrlInstance = new URL(imagenRuta, folderUrlInstance);
    } else {
      fullUrlInstance = new URL(imagenRuta, folderUrlInstance);
      fullUrlInstance.searchParams.set('timestamp', new Date().getTime().toString());
    }
    
    full_url = fullUrlInstance.href;
    console.log("full_url: ", full_url);
  }
  
  return (
    <>
      <Button onClick={funcion} style={plantilla_boton}>
        <Image src={full_url} alt={'Pelicula'} fill sizes="500px" priority quality={100} />
      </Button>
    </>
  );
  
}
//#endregion

export { ImageButton, Boton };
//NEXT exige altura y anchura o size.

/*

  const base_url_frontend_nextjs = 'http://localhost:3000/';
  const folder_url_frontend_nextjs  = 'public/';
  const folderUrlInstance_frontend_nextjs  = new URL(folder_url_frontend_nextjs, base_url_frontend_nextjs);
else {
      // Cambiar la carpeta a 'public/' del frontend para las imágenes del frontend
      fullUrlInstance = new URL('/testing.png', folderUrlInstance_frontend_nextjs);
    }
*/