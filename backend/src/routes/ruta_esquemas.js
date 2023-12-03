import express from 'express';
import controlador_esquema from '../controllers/control_esquemas.js';
import permiso_regular from '../middleware/middleware_regular.js';
import permiso_administrador from '../middleware/middleware_administrador.js';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

console.log("Iniciando... rutas de esquema");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });
const firma = process.env.JWT_SECRET;

const router_esquemas = express.Router();

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
  'GET /tablas': { 
    action: 'handle_tablas', 
    roles: ['admin'] 
  },
  'GET /describir_tablas': { 
    action: 'handle_describir_tablas', 
    roles: ['admin'] 
  },
};

for (const [key, { action, roles }] of Object.entries(actions)) {
  const [metodo, ruta] = key.split(' ');

  const permiso = asignarPermiso(roles);
  //console.log(`Configurando ruta ${metodo} ${ruta}, permiso necesario: ${permiso}`);

  if (permiso !== 'free') {
    router_esquemas[metodo.toLowerCase()](ruta, permiso, function (req, res) {
      controlador_esquema[action](req, res);
    });
  } else {
    router_esquemas[metodo.toLowerCase()](ruta, function (req, res) {
      controlador_esquema[action](req, res);
    });
  }
}

console.log(`-----------------------------------------------------------`);

const rutas_esquemas = {
  router_esquemas
};

export default rutas_esquemas;
