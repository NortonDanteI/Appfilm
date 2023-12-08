import { DataTypes} from 'sequelize';
import db_config from '../config/config_db.js'

class Usuario_model {
  constructor() {
    console.log("Iniciando... Usuario_model")
    this.validarLargo = this.validarLargo.bind(this); // Enlazar la función al contexto de la instancia
    this.Usuarios = this.defineModel();
  }

  validarLargo(value) {
    if (value.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }
  }

  defineModel() {
    return db_config.sequelize1.define('Usuarios', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        unique: true, // Asegura que el username sea único
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        validate: {
          validarLargo: this.validarLargo,
        },
      },
    });
  }
  
  async crear_tabla() {
    try {
      const result = await this.Usuarios.sync();
      console.log("En crear tabla model: ", result);
      return result;
    } catch (error) {
      console.error('Error al crear la tabla:', error);
      throw new Error('Error al crear la tabla');
    }
  }

  async borrar_tabla() {
    try {
      const result = await this.Usuarios.drop();
      console.log('Tabla borrada con éxito', result);
      return result;
    } catch (error) {
      console.error('Error al borrar la tabla:', error);
      throw new Error('Error al borrar la tabla');
    }
  }
  
  async crear_usuario(username, password) {
    try {
      const nuevoUsuario = await this.Usuarios.create({
        username,
        password,
      });
      return nuevoUsuario;
    } catch (error) {
      let errorsito = error.errors
      let msg = ''
      if (errorsito && errorsito.length > 0) {
        const ValidationErrorItem = errorsito[0];
        msg = ValidationErrorItem.message;
        console.log('Mensaje de error:', msg);
      } else {
        msg = error.parent.sqlMessage
        console.log("error.parent.sqlMessage: ", msg)
      }
      console.error('-------------------------------------------------------------');
      throw new Error(`Error al crear usuario: ${msg}`);
    }
  }

  async imprimir_registros() {
    try {
      const registros = await this.Usuarios.findAll();
      console.log('Registros de la tabla Usuarios:');
      registros.forEach((registro) => {
        console.log(registro.dataValues);
      });
      return registros
    } catch (error) {
      console.error('Error al imprimir registros:', error);
      throw new Error('Error al imprimir registros');
    }
  }

  async borrar_usuario_por_username(username) {
    try {
      const resultado = await this.Usuarios.destroy({
        where: {
          username,
        },
      });
      return resultado;
    } catch (error) {
      console.error(`Error al borrar usuario '${username}':`, error);
      throw error;
    }
  }

  async call_usuario_por_username(username) {
    console.log("Usuario_model; call_usuario_por_username(username)")
    console.log("username a buscar: ", username)
    try {
      const usuario = await this.Usuarios.findOne({
        where: {
          username,
        },
      });
      if (usuario) {
        console.log("que es esto: ", usuario)
        return usuario.dataValues;
      } else {
        // Manejar el caso en el que el usuario no fue encontrado
        return null;
      }
    } catch (error) {
      console.error('Error al buscar usuario desde model_usuario.js:', error.message);
      throw error;
    }
  }
}

const model_usuario = new Usuario_model();
export default model_usuario;
