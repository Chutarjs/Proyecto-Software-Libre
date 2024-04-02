const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los productos
module.exports.get =async (request,response, next)=>{
    const categorias= await prisma.categoria.findMany({
        orderBy:{
            nombre:'asc'
        },
        include:{
            subcategorias:true
        }
    })
    response.json(categorias);
}
//Obtener por Id
//localhost:3000/producto/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del videojuego
    let idCategoria=parseInt(request.params.id)
    const categoria=await prisma.categoria.findUnique({
        where: { id: idCategoria },
        include:{
            subcategorias:true
        }
    })
    response.json(categoria)
}
