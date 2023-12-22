import model_peliculas from '../models/model_peliculas.js';

class Control_peliculas {

  constructor(){
    console.log("Iniciando... Control_peliculas")
  }

  async handle_raiz(req, res) {
    console.log("Control_peliculas; handle_raiz()")
    try {
      res.status(201).json({ success: true, mensaje: 'Raíz peliculas funcionando...' });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error en la raíz peliculas...', error: error.message });
    }
  }

  async handle_imprimir_registros(req, res) {
    console.log("Control_peliculas; handle_imprimir_registros()")
    const result = await model_peliculas.imprimir_registros()
    try {
      res.status(201).json({ success: true, mensaje: 'imprimir registros de la tabla peliculas funcionando...', resultado: result });
    } catch (error) {
      res.status(500).json({ success: true, mensaje: 'Error al obtener registros de la tabla peliculas...' });
    }
  }

  async handle_buscar_pelicula_por_nombre(req, res) {
    console.log("Control_peliculas; handle_buscar_pelicula_por_nombre()")
    try {
      console.log("Informacion del body: ", req.body);
      const{nombre}=req.body
      const pelicula = await model_peliculas.buscar_pelicula_por_nombre(nombre);
      if (pelicula) {
        res.status(200).json({success:true , mensaje: 'pelicula encontrada', resultado: pelicula});
      } else {
        res.status(404).json({ success:false, mensaje: 'pelicula no encontrada'});
      }
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error al obtener pelicula por nombre: ' + error.message });
    }
  }

  async handle_buscar_pelicula_por_id(req, res) {
    console.log("Control_peliculas; handle_buscar_pelicula_por_id()");
    try {
      console.log("Información del body: ", req.body);
      const { id } = req.body;
      
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ success: false, mensaje: 'ID inválido. Debe ser un número positivo.' });
      }
  
      const pelicula = await model_peliculas.buscar_pelicula_por_id(id);
      if (pelicula) {
        res.status(200).json({ success: true, mensaje: 'Película encontrada', resultado: pelicula });
      } else {
        res.status(404).json({ success: false, mensaje: 'Película no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error al obtener película por ID: ' + error.message });
    }
  }
  
  async handle_actualizar_pelicula(req, res) {
    console.log("Control_peliculas; handle_actualizar_pelicula()");
    try {
      console.log("Información del body: ", req.body);
      const { id, ruta, nombre, sinopsis, anio_lanzamiento } = req.body;
      const pelicula = await model_peliculas.actualizar_pelicula(id, ruta, nombre, sinopsis, anio_lanzamiento);
      if (pelicula) {
        res.status(200).json({ success: true, mensaje: 'Película actualizada', resultado: pelicula });
      } else {
        res.status(404).json({ success: false, mensaje: 'Película no encontrada o no actualizada' });
      }
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error al actualizar película por id: ' + error.message });
    }
  }
  
  async handle_crear_tabla(req, res) {
    console.log("Control_peliculas; handle_crear_tabla()")
    try {
      const result = await model_peliculas.crear_tabla()
      res.status(201).json({ success: true, mensaje: 'Tabla peliculas creada con exito', resultado: result });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error al crear tabla peliculas', error: error });
    }
    
  }
  
  async handle_borrar_tabla(req, res) {
    console.log("Control_peliculas; handle_borrar_tabla()")
    try {
      const result = await model_peliculas.borrar_tabla()
      res.status(201).json({ success: true, mensaje: 'Tabla borrada con éxito', resultado: result });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error al borrar la tabla', error: error });
    }
  }

  async handle_registrar_pelicula(req, res) {
    console.log("Control_peliculas; handle_crear_pelicula()")
    try {
      console.log("Informacion del body: ", req.body)
      const { ruta, nombre, sinopsis, anio_lanzamiento } = req.body;
      const nueva_pelicula = await model_peliculas.crear_registro(ruta, nombre, sinopsis, anio_lanzamiento );
      res.status(201).json({ success:true, mensaje: 'pelicula registrada con éxito', resultado: nueva_pelicula });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error al registrar pelicula', error: error.message });
    }
  }
  
}

const controlador_peliculas = new Control_peliculas();
export default controlador_peliculas;
