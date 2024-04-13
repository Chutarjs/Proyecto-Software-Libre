const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los ajustes
module.exports.get =async (request,response, next)=>{
    const ajustes= await prisma.ajusteInventario.findMany({
        orderBy:{
            id:'asc'
        } ,         
        include:{
            bodega:true,
            usuario:true,
            productos:true,
        }
    })
    response.json(ajustes);
}
//Obtener por Id
//localhost:3000/ajuste/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del ajuste
    let idAjuste=parseInt(request.params.id)
    const ajuste=await prisma.ajusteInventario.findUnique({
        where: { id: idAjuste },
        include:{
            bodega:true,
            usuario:true,
            productos:true,
        }
    })
    response.json(ajuste)
}

//Crear un ajuste
module.exports.create = async (request, response, next) => {
    let body=request.body;
    const nuevoAjuste = await prisma.ajusteInventario.create({
        data:{
           fecha: body.fecha,  
           bodegaId: body.bodegaId,
           usuarioId: body.usuarioId,
           tipoMovimiento: body.tipoMovimiento,
           justificacion: body.justificacion,
           productos:{
            connect: { id: body.productos }
           }
        }
    })
    response.json(nuevoAjuste)
};