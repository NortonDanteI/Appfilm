// middleware/imagen.js
import multer from "multer";

const upload = multer();
const carga_single = upload.single("archivo");
const middleware_image = {
  carga_single,
};

export default middleware_image;