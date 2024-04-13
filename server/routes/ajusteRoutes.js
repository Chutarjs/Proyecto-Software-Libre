const express=require('express');
const router= express.Router();

//Controlador
const ajusteController=require('../controllers/ajusteController')
//Rutas
//localhost:3000/ajuste/
router.get('/',ajusteController.get)

router.post('/',ajusteController.create)

router.get('/:id',ajusteController.getById) 

module.exports=router 