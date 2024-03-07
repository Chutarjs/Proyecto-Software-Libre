const express=require('express');
const router= express.Router();

//Controlador
const inventarioController=require('../controllers/inventarioController')
//Rutas
//localhost:3000/videojuego/grafico
router.get('/',inventarioController.get)

router.post('/',inventarioController.create)

router.get('/:id',inventarioController.getById) 

router.put('/:id',inventarioController.update)

module.exports=router 