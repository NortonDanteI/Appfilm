// routes/ruta_imagenes.js
import express from 'express';
import controlador_imagenes from '../controllers/control_imagenes.js';
import permiso_administrador from '../middleware/middleware_administrador.js';
import permiso_regular from '../middleware/middleware_regular.js';
import middleware_image from '../middleware/middleware_imagen.js';

console.log("Iniciando... rutas de imagenes");
const router_imagenes = express.Router();

function asignarPermiso(roles) {
  let permiso = roles.includes('admin') ? permiso_administrador.verificar_token_administrador
    : roles.includes('regular') ? permiso_regular.verificar_token_regular
    : 'free';
  return permiso;
}

const actions = {
  'GET /': { action: 'handle_raiz', roles: ['free'] },
  'GET /buscar_imagen_por_nombre': { action: 'handle_buscar_imagen_por_nombre', roles: ['regular', 'admin'] },
  'POST /subida_de_imagen': { action: 'handle_subida_de_imagen', roles: ['regular', 'admin'] },
  'DELETE /borrar_imagen_por_nombre/:nombre': { action: 'handle_borrar_imagen_por_nombre', roles: ['regular', 'admin'] },
};

for (const [key, { action, roles }] of Object.entries(actions)) {
  const [metodo, ruta] = key.split(' ');

  const permiso = asignarPermiso(roles);

  if (permiso !== 'free') {
    if (ruta === '/subida_de_imagen') {
      router_imagenes[metodo.toLowerCase()](ruta, permiso,middleware_image.carga_single,  function (req, res) {
        controlador_imagenes[action](req, res);
      });
    } else {
      router_imagenes[metodo.toLowerCase()](ruta, permiso, function (req, res) {
        controlador_imagenes[action](req, res);
      });
    }
  } else {
    router_imagenes[metodo.toLowerCase()](ruta, function (req, res) {
      controlador_imagenes[action](req, res);
    });
  }
}

console.log(`-----------------------------------------------------------`);

const rutas_imagenes = {
  router_imagenes,
};

export default rutas_imagenes;
