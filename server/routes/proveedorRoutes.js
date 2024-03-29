const express=require('express');
const router= express.Router();

//Controlador
const proveedorController=require('../controllers/proveedorController')
//Rutas
router.get('/',proveedorController.get)

router.post('/',proveedorController.create)

router.get('/:id',proveedorController.getById) 

router.put('/:id',proveedorController.update)

module.exports=router 