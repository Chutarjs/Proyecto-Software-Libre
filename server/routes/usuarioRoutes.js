const express=require('express');
const router= express.Router();

//Controlador
const usuarioController=require('../controllers/usuarioController')
//Rutas
router.post("/login", usuarioController.login);

router.post("/registrar", usuarioController.register);

module.exports = router;