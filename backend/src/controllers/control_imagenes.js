class Control_imagenes {

  constructor(){
    console.log("Iniciando... Control_imagenes")
  }

  async handle_raiz(req, res) {
    console.log("Control_imagenes; handle_raiz()")
    try {
      res.status(201).json({ success: true, mensaje: 'Raíz imagenes funcionando...' });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error en la raíz imagenes...', error: error.message });
    }
  }
  async handle_buscar_imagen_por_nombre(req, res) {
    console.log("Control_imagenes; handle_buscar_imagen_por_nombre()");
    try {
      res.status(201).json({ success: true, mensaje: 'handle_buscar_imagen_por_nombre funcionando...' });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error en la handle_buscar_imagen_por_nombre...', error: error.message });
    }
  }

  async handle_subida_de_imagen(req, res) {
    console.log("Control_imagenes; handle_subida_de_imagen()")
    const { originalname, path } = req.file;
    let informacion = "Imagen guardada en public/"+originalname
    try {
      res.status(201).json({ success: true, mensaje: 'handle_subida_de_imagen funcionando...', resultado: informacion });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error en la handle_subida_de_imagen...', error: error.message });
    }
  }
  
  async handle_borrar_imagen_por_nombre(req, res) {
    console.log("Control_imagenes; handle_borrar_imagen_por_nombre()")
    try {
      res.status(201).json({ success: true, mensaje: 'handle_borrar_imagen_por_nombre funcionando...' });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error en la handle_borrar_imagen_por_nombre...', error: error.message });
    }
  }
  
}

const controlador_imagenes = new Control_imagenes();
export default controlador_imagenes;
