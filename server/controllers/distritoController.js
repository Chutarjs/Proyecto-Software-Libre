const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los productos
module.exports.get =async (request,response, next)=>{
    const distritos= await prisma.distrito.findMany({
        orderBy:{
            nombre:'asc'
        },
        include:{
            canton:{
                include:{
                    provincia:true
                }
            }
        }
    })
    response.json(distritos);
}
//Obtener por Id
//localhost:3000/producto/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del videojuego
    let idDistrito=parseInt(request.params.id)
    const distrito=await prisma.distrito.findUnique({
        where: { id: idDistrito },
        include:{
            canton:{
                include:{
                    provincia:true
                }
            }
        }
    })
    response.json(distrito)
}
