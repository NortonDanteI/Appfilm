import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

class Middleware_regular {
  constructor() {
    this.secreto = process.env.JWT_SECRET;
    this.verificar_token_regular = this.verificar_token_regular.bind(this);
  }

  configurar_devolucion(req, res, next) {

    const devolucion = function (error, token_deco) {
      if (error) {
        return res.status(401).json({ mensaje: 'Token inválido' });
      }

      console.log("Informacion del token: ", token_deco);
      req.usuario = token_deco;
      const { roles } = req.usuario;

      if (roles.includes('Regular')) {
        next()
      } else {
        // El usuario no tiene el rol necesario, por lo que se le niega el acceso
        return res.status(403).json({ mensaje: 'Acceso prohibido. No tienes el rol necesario.' });
      }
    };

    return devolucion;
  }

  verificar_token_regular(req, res, next) {
    console.log("Middleware_administrador; verificar_token_regular()")
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }
    const tokenSinBearer = token.replace("Bearer ", "");
    jwt.verify(tokenSinBearer, this.secreto, this.configurar_devolucion(req, res, next));
  }
}
const permiso_regular = new Middleware_regular();
export default permiso_regular;