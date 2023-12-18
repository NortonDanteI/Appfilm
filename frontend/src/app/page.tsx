"use client"
import './style.css';
import { Boton } from '../components/botones/a_Botones';
import { Input_custom } from '../components/inputs/a_inputs_';
import { Tipografia1 } from '@/components/typographys/a_typographys_';
import React, { useEffect, useRef, useState } from 'react';
import Login_guard from '@/guards/login_guard';

// Estado para manejar los datos del usuario
/*---------------------------------------- */
function Login() {
  console.log("Login; ")
  const [username, setUsername] = useState('Usuario'); // Estado para el nombre de usuario
  const [password, setPassword] = useState('Contraseña'); // Estado para la contraseña

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const ref = useRef(false); //objetos persistentes

  useEffect(() => {
    if (ref.current) {
      return
    };
    ref.current = true;
  }, [])

  return (
    <Login_guard >
      <div className="fondo">
        <div className="contenedor_centrado">
          <div className="formulario">
            <Tipografia1 texto="AppFilm" estilo={1} />
            <Input_custom texto={username} estilo={0} onChange={handleUsernameChange} />
            <Input_custom texto={password} estilo={0} onChange={handlePasswordChange} />
            <Boton llamada='ir_home_' texto="Iniciar sesión" estilo={1} usuarioData={{ username, password, rol: 'Regular' }} />
          </div>
        </div>
      </div>
    </Login_guard>
  );
}

export default Login;









/*

  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();

  }
uso div ya que estoy ruteando con next ....
pero se puede hacer con form con el codigo de arriba
*/