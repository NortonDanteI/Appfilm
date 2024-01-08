import fs from "fs";
import path from "path";
import sharp from "sharp";

class Control_imagenes {
  constructor() {
    console.log("Iniciando... Control_imagenes");
  }

  obtener_fecha() {
    console.log("Control_imagenes; obtener_fecha()");
    var fechaActual = new Date();
    // Obtener la fecha y hora actual
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que sumamos 1
    var año = fechaActual.getFullYear();

    // Obtener horario
    var horas = fechaActual.getHours();
    var minutos = fechaActual.getMinutes();
    var segundos = fechaActual.getSeconds();

    let full_fecha = año + "-" + mes + "-" + dia;
    let horario = horas + ":" + minutos + ":" + segundos;

    let retorno = full_fecha + "_" + horario;
    console.log("retorno: ", retorno);
    return retorno;
  }

  async handle_raiz(req, res) {
    console.log("Control_imagenes; handle_raiz()");
    try {
      res
        .status(201)
        .json({ success: true, mensaje: "Raíz imagenes funcionando..." });
    } catch (error) {
      res.status(500).json({
        success: false,
        mensaje: "Error en la raíz imagenes...",
        error: error.message,
      });
    }
  }

  async handle_buscar_imagen_por_nombre(req, res) {
    console.log("Control_imagenes; handle_buscar_imagen_por_nombre()");
    try {
      res.status(201).json({
        success: true,
        mensaje: "handle_buscar_imagen_por_nombre funcionando...",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        mensaje: "Error en la handle_buscar_imagen_por_nombre...",
        error: error.message,
      });
    }
  }

  async handle_subida_de_imagen(req, res) {
    const uploadedFileBuffer = req.file.buffer;
    const body = req.body;
    let nombre = body.nombre_sustituto;
    let extension = ".png";

    var primeros10 = nombre.substring(0, 10);
    var ultimos10 = nombre.substring(nombre.length - 10);

    console.log("Primeros 10 caracteres: " + primeros10);
    console.log("Últimos 10 caracteres: " + ultimos10);

    let aux_name = primeros10 + "-" + ultimos10;
    aux_name = aux_name.replace(/[\s|:]/g, "_").replace(/&/g, "Y").toLowerCase();
    console.log("aux_name: ", aux_name);

    let nombre_sustituto = aux_name + extension;

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

      let nuevo_buffer = await sharp(currentBuffer)
        .resize({ width: 320, height: 420, fit: "inside" })
        .png({ quality: 100 })
        .toBuffer();
      console.log("Tamaño redimensionado: ", nuevo_buffer.length);

      let calidad = 90;
      let limite = 1024000;
      while (nuevo_buffer.length > limite && calidad !== 0) {
        nuevo_buffer = await sharp(nuevo_buffer)
          .png({ quality: calidad })
          .toBuffer();
        console.log(
          "Nuevo tamaño: ",
          currentBuffer.length,
          " con calidad: ",
          calidad
        );
        calidad -= 10;
      }

      await sharp(nuevo_buffer).png().toFile(filePath);

      return res.status(200).json({ success: true, mensaje: "Archivo recibido, redimensionado y guardado como PNG con éxito" });
    } catch (error) {
      console.error("Error al guardar o redimensionar el archivo:", error);
      return res.status(500).json({ success: false, mensaje: "Error al guardar o redimensionar el archivo"});
    }
  }

  async handle_borrar_imagen_por_nombre(req, res) {
    console.log("Control_imagenes; handle_borrar_imagen_por_nombre()");
    try {
      res.status(201).json({
        success: true,
        mensaje: "handle_borrar_imagen_por_nombre funcionando...",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        mensaje: "Error en la handle_borrar_imagen_por_nombre...",
        error: error.message,
      });
    }
  }
}

const controlador_imagenes = new Control_imagenes();
export default controlador_imagenes;
