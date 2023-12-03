// scripts/listPublic.js
const fs = require('fs');
const path = require('path');

const publicDirectory = path.join(__dirname, '..', 'src/public');

fs.readdir(publicDirectory, (err, files) => {
  if (err) {
    console.error('Error al leer el directorio src/public:', err);
    return;
  }

  console.log('Contenido de la carpeta src/public: ',publicDirectory );
  files.forEach(file => {
    console.log(file);
  });
});
