const express=require('express');
const router= express.Router();

//Controlador
const distritoController=require('../controllers/distritoController')
//Rutas
//localhost:3000/videojuego/grafico
router.get('/',distritoController.get)

router.get('/:id',distritoController.getById) 

module.exports=router 