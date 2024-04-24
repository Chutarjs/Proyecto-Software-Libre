const express=require('express');
const router= express.Router();

//Controlador
const bodegaController=require('../controllers/bodegaController')
//Rutas
//localhost:3000/videojuego/grafico
router.get('/',bodegaController.get)
router.post('/create', bodegaController.create)
router.get('/:id',bodegaController.getById)
router.put('/:id', bodegaController.update)
module.exports=router   