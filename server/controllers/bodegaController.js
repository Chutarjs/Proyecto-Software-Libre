const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los productos
module.exports.get =async (request,response, next)=>{
    const bodegas = await prisma.bodega.findMany()
    response.json(bodegas)
}
//Obtener por Id
//localhost:3000/producto/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del videojuego
    let idBodega=parseInt(request.params.id)
    const bodega=await prisma.bodega.findUnique({
        where: { bodegaId: idBodega }
    })
    response.json(bodega)
}