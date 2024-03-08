const express=require('express');
const router= express.Router();

//Controlador
const ordenCompraController=require('../controllers/ordenCompraController')
//Rutas
//localhost:3000/orden/grafico
router.get('/',ordenCompraController.get)

router.get('/:id',ordenCompraController.getById) 


module.exports=router