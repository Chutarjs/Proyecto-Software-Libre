//Este archivo definirá las rutas para la funcionalidad de carga de datos desde Excel.
const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excelController');
const upload = require('../middleware/upload'); // Middleware para la carga de archivos

// Ruta para cargar datos desde Excel
router.post('/cargar-excel', upload.single('archivoExcel'), excelController.cargarDatosDesdeExcel);

module.exports = router;
