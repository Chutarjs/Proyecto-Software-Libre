const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los productos
module.exports.get =async (request,response, next)=>{
    const provincias= await prisma.provincia.findMany({
        orderBy:{
            nombre:'asc'
        }
    })
    response.json(provincias);
}
//Obtener por Id
//localhost:3000/producto/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del videojuego
    let idProvincia=parseInt(request.params.id)
    const provincia=await prisma.provincia.findUnique({
        where: { id: idProvincia },
    })
    response.json(provincia)
}
