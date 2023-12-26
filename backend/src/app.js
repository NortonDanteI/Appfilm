import express from 'express';
import cors from 'cors';
import db_config from './config/config_db.js'
import rutas_esquemas from './routes/ruta_esquemas.js';
import rutas_usuario from './routes/ruta_usuarios.js';
import rutas_peliculas from './routes/ruta_peliculas.js';
import rutas_imagenes from './routes/ruta_imagenes.js';
import mysql from 'mysql2';

console.log("Iniciando... app.js")

//#region funciones
//En javascript siempre devuelven promise cuando son asincronas pero para mayor detalle mejor ser explicito
async function testing() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(db_config.config);
    
    // Manejar el evento de conexión
    connection.connect((error) => {
      if (error) {
        reject(error); // Rechazar la promesa en caso de error
      } else {
        resolve(connection); // Resolver la promesa con la conexión
      }
    });
  });
}

function iniciarServidor() {
  const corsOptions = {
    origin: ['http://localhost:4000','http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization',
  };

  const app = express();

  app.use((req, res, next) => {
    console.log(`-----------------------------------------------------------`);
    console.log(`Solicitud recibida, tipo: ${req.method} | ruta: ${req.url}`);
    next(); // Llamada a next() para continuar con el siguiente middleware o controladorS
  });

  app.use(express.json());
  app.use(cors(corsOptions));
  app.use('/esquema',rutas_esquemas.router_esquemas)
  app.use('/api/usuario', rutas_usuario.router_usuario);
  app.use('/api/peliculas', rutas_peliculas.router_peliculas)
  app.use('/api/imagenes', rutas_imagenes.router_imagenes)
  app.use(express.static('public'))

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
  });
}
//#endregion funciones

//#region codigo main
async function iniciar() {
  try {
    let conexion = await testing();
    console.log('Conexión exitosa a la base de datos con puerto', conexion.config.port);
    iniciarServidor();
  } catch (error) {
    console.error('Error en la conexión a la base de datos o configuración del servidor:', error);
  }
}

iniciar();
//#endregion codigo main
