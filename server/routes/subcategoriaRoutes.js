const express=require('express');
const router= express.Router();

//Controlador
const subcategoriaController=require('../controllers/subcategoriaController')
//Rutas
//localhost:3000/videojuego/grafico
router.get('/',subcategoriaController.get)
router.get('/:id',subcategoriaController.getById) 

module.exports=router 