const express=require('express');
const router= express.Router();

//Controlador
const ordenCompraController=require('../controllers/ordenCompraController')
//Rutas
//localhost:3000/orden/grafico
router.get('/',ordenCompraController.get)
router.post('/',ordenCompraController.create)
router.get('/:id',ordenCompraController.getById) 
router.put('/:id',ordenCompraController.update)

module.exports=router 