import model_esquema from '../models/model_esquemas.js'
class Control_esquema {

  constructor(){
    console.log("Iniciando... Control_esquema")
  }

  async handle_raiz(req, res) {
    console.log("Control_esquema; handle_raiz()")
    res.status(200).json({ message: "Control_esquema; handle_raiz()" });
    //res.send('Raiz esquema funcionando correctamente...');
  }

  async handle_tablas(req, res) {
    console.log("Control_esquema; handle_tablas()")
    try {
      const tablas = await model_esquema.showAllTables();
      res.status(200).json({ success: true, mensaje: 'Tablas consultadas con exito', resultado: tablas });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error al obtener tablas', error: error.message });
    }
  }

  async handle_describir_tablas(req, res) {
    console.log("Control_esquema; handle_describir_tablas()")
    try {
      const tablas = await model_esquema.showAllTables();
      const esquemas = [];
  
      for (const tabla of tablas) {
        const esquema = await model_esquema.getTableSchema(tabla);
        esquemas.push({ tableName: tabla, schema: esquema });
      }
      res.status(200).json({ success: true, mensaje: 'Tablas descritas con éxito', resultado: esquemas });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error al describir tablas', error: error.message });
    }
  }
  
}

const controlador_esquema = new Control_esquema();
export default controlador_esquema;
