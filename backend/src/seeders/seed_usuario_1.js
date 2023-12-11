import bcrypt from 'bcrypt';
import model_usuario from '../models/model_usuario.js';
import controlador_usuario from '../controllers/control_usuarios.js';

class Seed_user {
  constructor() {
    this.username = 'usuario_1';
    this.contrasenia = 'contrasenia';
    this.rol ='Admnistrador'
  }

  async up() {
    try {
      const hashContraseña = await bcrypt.hash(this.contrasenia, 10);
      const result = await model_usuario.crear_usuario(this.username, hashContraseña, this.rol);
      console.log('Seeder ejecutado con éxito.', result.uniqno);
    } catch (error) {
      console.error('Error al ejecutar el seeder:', error.message);
    }
  }

  async down() {
    try {
      const contraseñaValida = await controlador_usuario.validar_contra(this.contrasenia,this.username)
      if(contraseñaValida){
        const result = await model_usuario.borrar_usuario_por_username(this.username);
        console.log('Rollback del seeder ejecutado con éxito.', result);
      }else {
        console.log('Rollback no ejecutado.')
      }

    } catch (error) {
      console.error('Error al hacer rollback del seeder:', error.message);
    }
  }
}

const seed_usuario_1 = new Seed_user();
export default seed_usuario_1;
