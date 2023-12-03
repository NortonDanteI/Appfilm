// components/barra_de_nav/barra_de_nav.tsx
import React from 'react';
import Link from 'next/link';
import { appBarStyle, toolbarStyle, linkStyle, buttonStyle } from "./styles";

import { AppBar, Toolbar, Button } from '@mui/material';

function Nav_bar() {
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
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Nav_bar;