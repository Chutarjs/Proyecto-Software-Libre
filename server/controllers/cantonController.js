const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los productos
module.exports.get =async (request,response, next)=>{
    const cantones= await prisma.canton.findMany({
        include: {
            provincia: true
        },
        orderBy:{
            nombre:'asc'
        }
    })
    response.json(cantones);
}
//Obtener por Id
//localhost:3000/producto/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del videojuego
    let idCanton=parseInt(request.params.id)
    const canton=await prisma.canton.findUnique({
        where: { id: idCanton },
        include: {provincia: true}
    })
    response.json(canton)
}
