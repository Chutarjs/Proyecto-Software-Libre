const express=require('express');
const router= express.Router();

//Controlador
const cantonController=require('../controllers/cantonController')
//Rutas
//localhost:3000/videojuego/grafico
router.get('/',cantonController.get)

router.get('/:id',cantonController.getById) 

module.exports=router 