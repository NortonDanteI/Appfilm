import model_usuario from '../models/model_usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Control_usuario {

  constructor(){
    console.log("Iniciando... Control_usuario")
  }

  async call_usuario_por_username(username) {
    try {
      const usuario = await model_usuario.call_usuario_por_username(username);
      return usuario;
    } catch (error) {
      console.error('Error al buscar usuario desde controller:', error.message);
      throw error;
    }
  }
  
  async handle_buscar_usuario_por_username(req, res) {
    console.log("Control_usuario; handle_buscar_usuario_por_username()")
    try {
      const { username } = req.body;
      console.log("username: ", username);
  
      const usuario = await this.call_usuario_por_username(username);
      if (usuario) {
        res.status(200).json({ success: true, mensaje: 'Usuario encontrado', resultado: usuario });
      } else {
        res.status(404).json({ success: false, mensaje: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error al obtener usuario por ID:' + error.message });
    }
  }
  
  async validar_contra(password, usuario) {
    console.log("Control_usuario; validar_contra() ", password);
    try {
      if (password == undefined) {
        console.log("No ha proporcionado contraseña devolviendo usuario y contraseñavalida : null,false");
        return false;
      } else {
        let pw_real = usuario.password;
        const contraseñaValida = await bcrypt.compare(password, pw_real);
  
        if (contraseñaValida) {
          console.log("La contraseña es valida...");
          return true;
        } else {
          console.log("La contraseña no es valida...");
          return false;
        }
      }
    } catch (error) {
      return false;
    }
  }
  
  async handle_login(req, res) {
    console.log("Control_usuario; handle_login()");
    const roles = ['Regular', 'Administrador'];
  
    let { username, password, rol, firma_recepcionada } = req.body;
    console.log("req.body: ", req.body);
  
    try {
      const usuario = await this.call_usuario_por_username(username);
      if (usuario == null) {
        console.log("El usuario encontrado ha sido null, devolviendo 401...");
        res.status(401).json({ success: false, message: 'Usuario no encontrado...' });
      } else {
        const contraseñaValida = await this.validar_contra(password, usuario);
        console.log("contraseña valida: ", contraseñaValida);
        if (contraseñaValida) {
          let rolesUsuario = roles[0];
          if (rol === roles[1] && firma_recepcionada === process.env.JWT_SECRET) {
            rolesUsuario = roles[1];
          }
  
          const { id } = usuario;
          console.log("El id del usuario encontrado es: ", id);
          console.log("Rol asignado al usuario: ", rolesUsuario, "Inicio de sesión exitoso.");
          console.log("------Datos del token-------")
          console.log("id: ", id, " usuario.username: ", usuario.username, " rolesUsuario: ", rolesUsuario)
  
          const token = jwt.sign({ userId: id, username: usuario.username, roles: rolesUsuario }, process.env.JWT_SECRET, { expiresIn: '24h' });
          res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', token });
        } else {
          res.status(401).json({ success: false, message: 'Inicio de sesión rechazado' });
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión desde controller:', error);
      res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
    }
  }

  async handle_raiz(req, res) {
    console.log("Control_usuario; handle_raiz()")
    //res.send('Raiz usuario funcionando correctamente...');
    try {
      res.status(201).json({ success: true, mensaje: 'Raiz usuario funcionando...' });
    } catch (error) {
      res.status(500).json({ success: true, mensaje: 'Error en la raiz usuario...' });
    }
  }

  async handle_imprimir_registros(req, res) {
    console.log("Control_usuario; handle_imprimir_registros()")
    const result = await model_usuario.imprimir_registros()
    try {
      res.status(201).json({ success: true, mensaje: 'imprimir registros de la tabla usuarios funcionando...', resultado: result });
    } catch (error) {
      res.status(500).json({ success: true, mensaje: 'Error al obtener registros de la tabla usuarios...' });
    }
  }

  async handle_crear_usuario(req, res) {
    try {
      console.log("Informacion del body: ", req.body)
      const { username, password } = req.body;
      console.log("contraseña: ", username)
  
      const hashContraseña = await bcrypt.hash(password, 10);
      const nuevoUsuario = await model_usuario.crear_usuario(username, hashContraseña);
      res.status(201).json({ success:true, mensaje: 'Usuario creado con éxito', resultado: nuevoUsuario });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error al crear usuario', error: error.message });
    }
  }

  //#region uso administrativo
  async handle_crear_tabla(req, res) {
    console.log("Control_usuario; handle_crear_tabla()")

    try {
      const nueva_tabla = await model_usuario.crear_tabla()
      res.status(201).json({ success: true, mensaje: 'Tabla creada con exito', resultado: nueva_tabla });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error al crear tabla', error: error });
    }
    
  }
  
  async handle_borrar_tabla(req, res) {
    console.log("Control_usuario; handle_borrar_tabla()")

    try {
      const result = await model_usuario.borrar_tabla()
      res.status(201).json({ success: true, mensaje: 'Tabla borrada con éxito', resultado: result });
    } catch (error) {
      res.status(500).json({ success: false, mensaje: 'Error al borrar la tabla', error: error });
    }
  }
  //#endregion uso administrativo
}

const controlador_usuario = new Control_usuario();
export default controlador_usuario;
