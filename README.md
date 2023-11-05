# Aplicación de Gestión de Películas con Autenticación JWT

**Descripción del repositorio**
- Este proyecto tiene como objetivo desarrollar una aplicación web de gestión de películas que incluye un sistema de autenticación segura mediante JSON Web Tokens (JWT). La aplicación se divide en dos componentes principales: el frontend desarrollado con React.js y Material-UI, y el backend implementado con Express.js.

**Meta**
- El objetivo principal de este proyecto es desarrollar una aplicación web de gestión de películas con un sistema de autenticación seguro basado en JWT. La aplicación estará destinada a usuarios que deseen gestionar una base de datos de películas, permitiéndoles crear, leer, actualizar y eliminar registros de películas. Este proyecto tiene como meta principal la satisfacción de los siguientes objetivos:

Creación de una interfaz de usuario amigable y atractiva para facilitar la gestión de películas. Implementación de una autenticación segura para proteger los datos y limitar el acceso solo a usuarios autorizados. Conexión con una base de datos MariaDB alojada en un contenedor Docker. Uso del ORM Sequelize para modelar y realizar consultas a la base de datos. Creación de un seeder para cargar un usuario por defecto en la base de datos.

**Frontend (React.js y Material-UI):**

- El frontend de la aplicación es la interfaz de usuario que los usuarios utilizarán para acceder a las funcionalidades de gestión de películas. Estará compuesto por varias páginas y componentes, incluyendo:

Página de inicio de sesión: Los usuarios deben autenticarse para acceder a las características de gestión de películas. Aquí, ingresarán su nombre de usuario y contraseña.

Página de registro: Los nuevos usuarios podrán crear cuentas proporcionando la información necesaria, que incluye nombre de usuario y contraseña.

Página de gestión de películas (CRUD): Una vez autenticados, los usuarios podrán realizar las siguientes operaciones:

Crear nuevas películas, proporcionando información como título, director, género, año de lanzamiento, etc.
Leer y ver la lista de películas existentes.
Actualizar la información de películas existentes.
Eliminar películas de la base de datos.

**Backend (Express.js):**
- El backend de la aplicación es la parte que maneja las solicitudes de los usuarios y se comunica con la base de datos MariaDB utilizando el ORM Sequelize. Aquí, se gestionarán las siguientes funciones:

Autenticación segura: El sistema de autenticación verificará las credenciales de los usuarios y generará tokens JWT válidos para acceder a las funcionalidades de gestión de películas.

Operaciones CRUD de películas: El backend ofrecerá endpoints para crear, leer, actualizar y eliminar películas en la base de datos. Solo los usuarios autenticados tendrán acceso a estas operaciones.

Carga de usuario por defecto: Se incluirá un seeder de Sequelize para cargar un usuario por defecto en la base de datos. Este usuario servirá como punto de partida para las pruebas de autenticación.

**Desarrolladores del software**
- Norton Irarrázabal.

**Herramientas y Tecnologías Utilizadas**
- Lenguaje de Programación: Javascript
- Frontend: React.js y Material-UI
- Backend: Express.js
- Base de Datos: MariaDB (a través de un contenedor Docker)
- ORM: Sequelize
- Herramientas de Desarrollo: Visual studio
- Gestión de Repositorio: Git (el código fuente se encuentra en un repositorio Git)

