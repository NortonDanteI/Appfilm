import express from 'express';
import controlador_usuario from '../controllers/control_usuarios.js';
import permiso_regular from '../middleware/middleware_regular.js';
import permiso_administrador from '../middleware/middleware_administrador.js';

console.log("Iniciando... rutas de usuario")

const router_usuario = express.Router()

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
  'POST /login': { 
    action: 'handle_login', 
    roles: ['free'] 
  },
  'POST /crear_usuario': { 
    action: 'handle_crear_usuario', 
    roles: ['free'] 
  },
  'POST /crear_tabla': { 
    action: 'handle_crear_tabla', 
    roles: ['free'] 
  },
  'GET /buscar_usuario_por_username': { 
    action: 'handle_buscar_usuario_por_username', 
    roles: ['admin'] 
  },
  'POST /borrar_tabla': { 
    action: 'handle_borrar_tabla', 
    roles: ['admin'] 
  },
  'GET /imprimir_registros': { 
    action: 'handle_imprimir_registros', 
    roles: ['admin'] 
  },
};

for (const [key, { action, roles }] of Object.entries(actions)) {
  const [metodo, ruta] = key.split(' ');

  const permiso = asignarPermiso(roles);
  //console.log(`Configurando ruta ${metodo} ${ruta}, permiso necesario: ${permiso}`);
  
  if(permiso!='free'){
    router_usuario[metodo.toLowerCase()](ruta, permiso, function (req, res) {
      controlador_usuario[action](req, res);
    });
  } else {
    router_usuario[metodo.toLowerCase()](ruta, function (req, res) {
      controlador_usuario[action](req, res);
    });
  }
}

console.log(`-----------------------------------------------------------`);

const rutas_usuario = {
  router_usuario
};

export default rutas_usuario;
