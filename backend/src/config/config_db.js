import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import {Sequelize } from 'sequelize';

// Obtiene la ruta del archivo actual (__filename) utilizando la función fileURLToPath y el objeto import.meta.url.
const filename = fileURLToPath(import.meta.url);

// Obtiene el directorio del archivo actual (__dirname) utilizando la función dirname del módulo 'path'.
const dirname = path.dirname(filename);

// Carga las variables de entorno desde el archivo '.env' en el directorio actual.
dotenv.config({ path: path.join(dirname, '../../.env') });

const config = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

const config_seq = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
};

const sequelize1 = new Sequelize(config_seq);

const db_config = {
  config,
  sequelize1,
};

export default db_config;
