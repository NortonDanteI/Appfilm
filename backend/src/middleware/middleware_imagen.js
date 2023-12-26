// middleware/middleware_imagen.js
import multer from 'multer';

console.log("Iniciando... middleware de imágenes");

const almacen = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public'); // Aquí estás especificando el directorio 'public'
  },
  filename: function (req, file, cb) {
    console.log("file: ", file)
    cb(null, file.originalname); // Aquí estás usando el nombre original del archivo
  }
});


const filtro = (req, file, cb) => {
  if (file && (file.mimetype === 'image/jpg' || file.mimetype === 'image/png')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: almacen, fileFilter: filtro });
const imagen = upload.single('imagen');

const middleware = {
  imagen,
};

export default middleware;
