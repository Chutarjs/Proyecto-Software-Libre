const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const usuarios=await prisma.usuario.findMany({
        orderBy:{
            id: 'asc'
        },
    })
    response.json(usuarios)
}
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let idUsuario=parseInt(request.params.id)
    const usuario=await prisma.usuario.findUnique({
        where: { id: idUsuario },
    })
    response.json(usuario)
}