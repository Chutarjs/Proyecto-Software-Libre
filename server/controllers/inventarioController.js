const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los productos
module.exports.get =async (request,response, next)=>{
    const bodega= await prisma.bodega.findMany({
       orderBy:{
        nombre:'asc'
       } 
    })
    response.json(bodega)
}
//Obtener por Id
//localhost:3000/producto/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del videojuego
    let idBodega=parseInt(request.params.id)
    const bodega=await prisma.bodega.findUnique({
        where: { id: idBodega }
    })
    response.json(bodega)

}
//Crear un producto
module.exports.create = async (request, response, next) => {
};
//Actualizar un producto
module.exports.update = async (request, response, next) => {
};