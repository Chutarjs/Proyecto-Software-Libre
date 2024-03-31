const express=require('express');
const router= express.Router();

//Controlador
const provinciaController=require('../controllers/provinciaController')
//Rutas
//localhost:3000/videojuego/grafico
router.get('/',provinciaController.get)

router.get('/:id',provinciaController.getById) 

module.exports=router 