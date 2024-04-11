//Este middleware será responsable de manejar la carga de archivos del excel desde la solicitud.

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
