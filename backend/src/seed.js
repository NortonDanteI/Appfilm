import db_config from './config/config_db.js';
import mysql from 'mysql2';
import seed_usuario_1 from './seeders/seed_usuario_1.js';
import readline from 'readline'; 

console.log("Iniciando... seed.js");

//#region funciones
async function conectar() {
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

async function opcion() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Ingrese "up" o "down": ', function (respuesta) {
      rl.close();
      resolve(respuesta);
    });
  });
}

//#endregion funciones

//#region codigo main
async function seed() {
  try {
    let conexion = await conectar();
    console.log('Conexión exitosa a la base de datos con puerto', conexion.config.port);

    let opcionSeleccionada = await opcion();
    console.log("Ha ingresado: ", opcionSeleccionada);

    if (opcionSeleccionada.toLowerCase() === "down") {
      console.log("Eliminando semilla...");
      await seed_usuario_1.down();
    } else if (opcionSeleccionada.toLowerCase() === "up") {
      console.log("Creando semilla...");
      await seed_usuario_1.up();
    } else {
      console.log("Opción no válida... control + c y vuelva a ejecutar node seed.js");
    }
  } catch (error) {
    console.error('Error en la conexión a la base de datos o configuración del servidor:', error);
  }
}
seed();
//#endregion codigo main
