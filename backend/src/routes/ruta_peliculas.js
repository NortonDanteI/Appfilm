import express from 'express';
import controlador_peliculas from '../controllers/control_peliculas.js';
import permiso_administrador from '../middleware/middleware_administrador.js';
import permiso_regular from '../middleware/middleware_regular.js';

console.log("Iniciando... rutas de peliculas");


const router_peliculas = express.Router();

function asignarPermiso(roles) {
  let permiso = roles.includes('admin') ? permiso_administrador.verificar_token_administrador
  : roles.includes('regular') ? permiso_regular.verificar_token_regular
  : 'free';
  return permiso
}

const actions = {
  'GET /': { 
    action: 'handle_raiz', 
    roles: ['free'] 
  },
  'GET /buscar_pelicula_por_nombre': { 
    action: 'handle_buscar_pelicula_por_nombre', 
    roles: ['regular', 'admin'] 
  },
  'GET /buscar_pelicula_por_id': { 
    action: 'handle_buscar_pelicula_por_id', 
    roles: ['regular', 'admin'] 
  },
  'GET /imprimir_registros': { 
    action: 'handle_imprimir_registros', 
    roles: ['admin'] 
  },
  
  'POST /registrar_pelicula': { 
    action: 'handle_registrar_pelicula', 
    roles: ['regular', 'admin']
  },
  'POST /borrar_tabla': { 
    action: 'handle_borrar_tabla', 
    roles: ['admin'] 
  },
  'POST /crear_tabla': { 
    action: 'handle_crear_tabla', 
    roles: ['free'] 
  },
  'DELETE /borrar_pelicula/:id': {
    action: 'handle_borrar_pelicula',
    roles: ['admin'],
  },
  
  'PUT /actualizar_pelicula': { 
    action: 'handle_actualizar_pelicula', 
    roles: ['admin'] 
  },
};

for (const [key, { action, roles }] of Object.entries(actions)) {
  const [metodo, ruta] = key.split(' ');

  const permiso = asignarPermiso(roles);
  //console.log(`Configurando ruta ${metodo} ${ruta}, permiso necesario: ${permiso}`);

  if(permiso!='free'){
    router_peliculas[metodo.toLowerCase()](ruta, permiso, function (req, res) {
      controlador_peliculas[action](req, res);
    });
  } else {
    router_peliculas[metodo.toLowerCase()](ruta, function (req, res) {
      controlador_peliculas[action](req, res);
    });
  }
}

console.log(`-----------------------------------------------------------`);

const rutas_peliculas = {
  router_peliculas
};

export default rutas_peliculas;


/*
const asignarPermiso = (roles) => {
  return roles.includes('admin') ? permiso_administrador.verificar_token_administrador
    : roles.includes('regular') ? permiso_regular.verificar_token_regular
    : 'free';
};
*/