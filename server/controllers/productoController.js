const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los productos
module.exports.get =async (request,response, next)=>{
    const producto= await prisma.producto.findMany({
        orderBy:{
            nombre:'asc'
        } ,         
        include:{
            subcategoria:true,
        }
    })
    response.json(producto)
}
//Obtener por Id
//localhost:3000/producto/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del videojuego
    let idProducto=parseInt(request.params.id)
    const producto=await prisma.producto.findUnique({
        where: { id: idProducto },
        include:{
            subcategoria:true,
        }
    })
    response.json(producto)

}
//Crear un producto
module.exports.create = async (request, response, next) => {
};
//Actualizar un producto
module.exports.update = async (request, response, next) => {
};