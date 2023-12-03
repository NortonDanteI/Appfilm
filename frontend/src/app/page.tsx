// Login.tsx

import React from 'react';
import './style.css'; //clases
import {Boton} from '../components/botones/a_Botones';
import {Input_custom} from '../components/inputs/a_inputs_';
import { Tipografia1 } from '@/components/typographys/a_typographys_';
import Usuario from '@/models/interface_usuario';

//usestate para guardar datos
//useeffect para cargar datos
//render 

const usuario: Usuario = {
  nombre: "Usuario",
  contrasenia: "Contraseña"
};

/*---------------------------------------- */
function Login() {
  return (
    <div className="fondo">
      <div className="contenedor_centrado">
        <form action="" className="formulario">
          <Tipografia1 texto = "AppFilm" estilo={1}/>
          <Input_custom texto = {usuario.nombre} estilo={0}/>
          <Input_custom texto = {usuario.contrasenia} estilo={0} />
          <Boton llamada='ir_home_' texto = "Iniciar sesión" estilo={1}/>
        </form>
      </div>
    </div>
  );
}

export default Login;