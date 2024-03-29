const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los productos
module.exports.get =async (request,response, next)=>{
    const inventario = await prisma.inventario.findMany({
       include:{
        producto:true,
        bodega:{
            select:{
                capacidad:true,
                encargados:true,
                nombre:true
            }
        }
    }
    })
    response.json(inventario)
}
//Obtener por Id
//localhost:3000/producto/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del videojuego
    let idBodega=parseInt(request.params.id)
    const inventarioBodega=await prisma.inventario.findMany({
        where: { bodegaId: idBodega },
        include:{
            bodega:{
                select:{
                    capacidad:true,
                    encargados:true,
                    nombre:true
                }
            },
            producto:true
        }
    })
    response.json(inventarioBodega)
}
//Crear un inventario
module.exports.create = async (request, response, next) => {
    //insertar en una bodega un producto (con su cantidad), validando que el producto no supere la cantidad minima y maxima de existencias
    
};
//Actualizar un producto
module.exports.update = async (request, response, next) => {
    //Modificar inventario: el usuario de poder actualizar el inventario seleccionado, precargado toda la información solicitada,
    //con los valores iniciales correctos y actualizar todos los aspectos antes listados en crear, además de los siguientes aspectos:
    //• Cantidad de producto disponible: no editable al actualizar
    //• Usuario que realizo el registro: al actualizar no se debe realizar ningún cambio en este campo
    //• Usuario que actualizó por última vez: asigne otro usuario por defecto, diferente al que registro

};