import db_config from '../config/config_db.js'

class Esquema_model {
  constructor() {
    console.log("Iniciando... Esquema_model");
  }

  async showAllTables() {
    console.log("Esquema_model; showAllTables");
    try {
      const tables = await db_config.sequelize1.getQueryInterface().showAllTables();
      return tables;
    } catch (error) {
      console.error('Error al obtener tablas:', error.message);
      throw error;
    }
  }

  async getTableSchema(tableName) {
    try {
      const tableSchema = await db_config.sequelize1.queryInterface.describeTable(tableName);
      return tableSchema;
    } catch (error) {
      console.error('Error al obtener esquema de tabla:', error.message);
      throw error;
    }
  }
}

const model_esquema = new Esquema_model();
export default model_esquema;
