const express=require('express');
const router= express.Router();

//Controlador
const categoriaController=require('../controllers/categoriaController')
//Rutas
//localhost:3000/videojuego/grafico
router.get('/',categoriaController.get)
router.get('/:id',categoriaController.getById) 

module.exports=router 