const express=require('express');
const router= express.Router();

//Controlador
const usuarioController=require('../controllers/usuarioController')
//Rutas
//localhost:3000/videojuego/grafico
router.get('/',usuarioController.get)

router.post('/',usuarioController.create)

router.get('/:id',usuarioController.getById) 

router.put('/:id',usuarioController.update)
module.exports=router 