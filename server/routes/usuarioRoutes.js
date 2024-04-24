const express=require('express');
const router= express.Router();

//Controlador
const usuarioController=require('../controllers/usuarioController')
//Rutas
router.get("/", usuarioController.get);

router.post("/login", usuarioController.login);

router.post("/registrar", usuarioController.register);

router.post("/create", usuarioController.register);

router.get("/:id", usuarioController.getById);

router.put("/:id", usuarioController.update);

module.exports = router;  