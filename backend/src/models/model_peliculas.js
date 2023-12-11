import { DataTypes} from 'sequelize';
import db_config from '../config/config_db.js'

class peliculas_model {
  constructor() {
    console.log("Iniciando... peliculas_model")
    this.validarLargo = this.validarLargo.bind(this); // Enlazar la función al contexto de la instancia
    this.peliculas = this.defineModel();
  }

  validarLargo(value) {
    if (value.length <= 0 || value.length >= 100) {
      throw new Error('El nombre de la película debe tener entre 1 y 99 caracteres.');
    }
  }  

  defineModel() {
    return db_config.sequelize1.define('Peliculas', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ruta: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          validarLargo: this.validarLargo,
        },
      },
      sinopsis: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      anio_lanzamiento: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
  }
  
  async crear_tabla() {
    try {
      const result = await this.peliculas.sync();
      console.log("result de crear tabla: ", result)
      return result;
    } catch (error) {
      console.error('Error al crear la tabla peliculas:', error);
      throw new Error('Error al crear la tabla peliculas');
    }
  }

  async borrar_tabla() {
    try {
      const result = await this.peliculas.drop();
      console.log('Tabla peliculas borrada con éxito', result);
      return result;
    } catch (error) {
      console.error('Error al borrar la tabla peliculas:', error);
      throw new Error('Error al borrar la tabla peliculas');
    }
  }
  
  async crear_registro(ruta,nombre, sinopsis, anio_lanzamiento) {
    try {
      const nueva_pelicula = await this.peliculas.create({
        ruta,
        nombre,
        sinopsis,
        anio_lanzamiento,
      });
      return nueva_pelicula;
    } catch (error) {
      console.error('Error al registrar película:', error);
      throw new Error('Error al registrar película');
    }
  }

  async imprimir_registros() {
    try {
      const registros = await this.peliculas.findAll();
      console.log('Registros de la tabla peliculas:');
      registros.forEach((registro) => {
        console.log(registro.dataValues);
      });
      return registros
    } catch (error) {
      console.error('Error al imprimir registros de la tabla peliculas:', error);
      throw new Error('Error al imprimir registros de la tabla peliculas');
    }
  }
  
  async buscar_pelicula_por_nombre(nombre) {
    try {
      const usuario = await this.peliculas.findOne({
        where: {
          nombre,
        },
      });
      return usuario;
    } catch (error) {
      console.error('Error al buscar pelicula:', error.message);
      throw error;
    }
  }
}

const model_peliculas = new peliculas_model();
export default model_peliculas;