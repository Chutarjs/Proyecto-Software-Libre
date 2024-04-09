const express=require('express');
const router= express.Router();

//Controlador
const usuarioController=require('../controllers/usuarioController')
//Rutas
//localhost:3000/videojuego/grafico
router.get('/',usuarioController.get)

router.get('/:id',usuarioController.getById) 

module.exports=router 