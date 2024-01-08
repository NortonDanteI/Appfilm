import express from "express";
import cors from "cors";
import db_config from "./config/config_db.js";
import rutas_esquemas from "./routes/ruta_esquemas.js";
import rutas_usuario from "./routes/ruta_usuarios.js";
import rutas_peliculas from "./routes/ruta_peliculas.js";
import rutas_imagenes from "./routes/ruta_imagenes.js";
import mysql from "mysql2";

import multer from "multer";
import path from "path";
import sharp from "sharp";

console.log("Iniciando... app.js");

//#region funcion conexion database

function handle_conexion_database(resolve, reject) {
  const connection = mysql.createConnection(db_config.config);

  function handleConnectionEvent(error) {
    if (error) {
      reject(error); // Rechazar la promesa en caso de error
    } else {
      resolve(connection); // Resolver la promesa con la conexión
    }
  }

  connection.connect(handleConnectionEvent);
}

async function testing_conexion_database() {
  return new Promise(handle_conexion_database);
}
//#endregion funcion conexion database

//#region funciones
function middle_basic(req, res, next) {
  console.log(`FUNCTION: middle_basic();`);
  console.log("FUNCTION: middle_basic(); req.body: ", req.body);
  console.log(
    `FUNCTION: middle_basic(); Solicitud recibida, tipo: ${req.method} | ruta: ${req.url}`
  );
  next(); // Llamada a next() para continuar con el siguiente middleware o controlador
}

function onServerListening(puerto) {
  console.log(`FUNCTION: onServerListening();`);
  console.log(`Servidor Express en ejecución en el puerto ${puerto}`);
}

function iniciarServidor() {
  const corsOptions = {
    origin: ["http://localhost:4000", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
    allowedHeaders: "Content-Type, Authorization",
  };
  const app = express();
  const port = 4000;

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use('/permanente', express.static('public/permanente'));
  app.use(middle_basic);

  const upload = multer();

  // Ruta para manejar la subida de archivos
  app.post("/ruta", upload.single("archivo"), async (req, res) => {
    // Acceder al archivo subido en el buffer
    const uploadedFileBuffer = req.file.buffer;

    // Acceder a otros atributos en la solicitud (por ejemplo, req.body)
    const body = req.body;
    let nombre_sustituto = body.nombre_sustituto + ".png";

    if (!uploadedFileBuffer) {
      return res.status(400).send("No se encontró el archivo en la solicitud");
    }

    // Ruta completa donde se guardará el archivo
    const uploadDirectory = "public/permanente/";
    const filePath = path.join(uploadDirectory, nombre_sustituto);
    console.log("filePath: ", filePath);

    try {
      let currentBuffer = Buffer.from(uploadedFileBuffer);
      console.log("Tamaño de entrada: ", currentBuffer.length);

      let nuevo_buffer = await sharp(currentBuffer).resize({ width: 300, height: 300, fit: "inside" }).png({ quality: 100 }).toBuffer();
      console.log("Tamaño redimensionado: ", nuevo_buffer.length);

      let calidad = 90;
      let limite = 1024000;
      while ((nuevo_buffer.length > limite && calidad !== 0)) {
        nuevo_buffer = await sharp(nuevo_buffer).png({ quality: calidad }).toBuffer();
        console.log("Nuevo tamaño: ", currentBuffer.length , " con calidad: ", calidad);
        calidad -= 10;
      }

      await sharp(nuevo_buffer).png().toFile(filePath);

      return res.send(
        "Archivo recibido, redimensionado y guardado como PNG con éxito"
      );
    } catch (error) {
      console.error("Error al guardar o redimensionar el archivo:", error);
      return res
        .status(500)
        .send("Error al guardar o redimensionar el archivo");
    }
  });

  app.use("/esquema", rutas_esquemas.router_esquemas);
  app.use("/api/usuario", rutas_usuario.router_usuario);
  app.use("/api/peliculas", rutas_peliculas.router_peliculas);
  app.use("/api/imagenes", rutas_imagenes.router_imagenes);
  app.listen(port, onServerListening(port));
}
//#endregion funciones

//#region codigo main
async function iniciar() {
  try {
    
    let conexion = await testing_conexion_database();
    console.log(
      "Conexión exitosa a la base de datos con puerto",
      conexion.config.port
    );
    iniciarServidor();
  } catch (error) {
    console.error(
      "Error en la conexión a la base de datos o configuración del servidor:",
      error
    );
  }
}

iniciar();
//#endregion codigo main

//En javascript siempre devuelven promise cuando son asincronas pero para mayor detalle mejor ser explicito ademas puedes pasarle parametros
// como resolve o reject

//const stats = fs.statSync(ruta_temporal);
//const originalSize = stats.size;

/*
const carga_any = upload.any(); //arreglos
const carga_fields = upload.fields([
  { name: "nombre_pelicula" },
  { name: "nombre_sustituto" },
]); //arreglos

function save() {
  function handle_error_rename(error) {
    if (error) {
      res
        .status(500)
        .json({
          success: false,
          mensaje: "Error en la handle_error_rename...",
          error: error.message,
        });
    }
    res
      .status(201)
      .json({
        success: true,
        mensaje: "archivo guardado con éxito en permanente.",
      });
  }
  fs.rename(ruta_temporal, nuevo_path, handle_error_rename);
}

      //FORMA 1: JPEG MENOR PESO
      const jpegBuffer = await sharp(uploadedFileBuffer)
        .resize(300, 300, { withoutEnlargement: true, fit: "inside" })
        .jpeg({ quality: 80 })
        .toBuffer();

      //await sharp(jpegBuffer).jpeg().toFile(filePath);
*/
