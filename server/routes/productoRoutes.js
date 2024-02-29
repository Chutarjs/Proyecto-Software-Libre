const express=require('express');
const router= express.Router();

//Controlador
const productoController=require('../controllers/productoController')
//Rutas
//localhost:3000/videojuego/grafico
router.get('/',productoController.get)

router.post('/',productoController.create)

router.get('/:id',productoController.getById) 

router.put('/:id',productoController.update)

module.exports=router 