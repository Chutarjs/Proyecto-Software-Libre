const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los productos
module.exports.get =async (request,response, next)=>{
    const subcategorias= await prisma.subcategoria.findMany({
        orderBy:{
            nombre:'asc'
        }
    })
    response.json(subcategorias);
}
//Obtener por Id
//localhost:3000/producto/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del videojuego
    let idSubcategoria=parseInt(request.params.id)
    const subcategoria=await prisma.subcategoria.findUnique({
        where: { id: idSubcategoria },
    })
    response.json(subcategoria)
}
