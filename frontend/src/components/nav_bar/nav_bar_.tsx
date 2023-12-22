// components/barra_de_nav/barra_de_nav.tsx
import React from 'react';
import Link from 'next/link';
import { appBarStyle, toolbarStyle, linkStyle, buttonStyle } from "./styles";
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Usuario_model } from '@/models/usuario_model';
import { usuario_controller_singleton } from '@/controllers/usuario_controller';
import { Usuario_bd } from '@/models/interface_usuario';

function Nav_bar() {
  const router = useRouter()

  function Cerrar_sesion() {
    console.log("COMPONENTE: nav_bar_; FUNCTION: Cerrar_sesion()")
    var user_model: Usuario_model = usuario_controller_singleton.obtenerUsuarioModel();
    let clean: boolean = user_model.clean_local()
    console.log("COMPONENTE: nav_bar_; Se ha limpiado la data del user: ", clean)
    if (clean == true) {
      router.push('/');
    } else {
      alert("No se ha podido cerrar sesión.")
    }
  }

  return (
    <>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar style={{ ...appBarStyle, ...toolbarStyle }}>
          <Link style={linkStyle} href="/home">
            <Button style={{ ...appBarStyle, ...buttonStyle }} color="inherit">
              Ver películas
            </Button>
          </Link>
          <Link style={linkStyle} href="/home/registrar">
            <Button style={{ ...appBarStyle, ...buttonStyle }} color="inherit">
              Registrar películas
            </Button>
          </Link>
          <Link style={linkStyle} href="/">
            <Button onClick={Cerrar_sesion} style={{ ...appBarStyle, ...buttonStyle }} color="inherit">
              Cerrar sesión
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Nav_bar;