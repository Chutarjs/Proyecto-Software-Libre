const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');
const prisma = new PrismaClient();

//Listar todos los productos
module.exports.get =async (request,response, next)=>{
    const bodegas = await prisma.bodega.findMany({
        include:{
            ubicacion: true
        }
    })
    response.json(bodegas)
}
//Obtener por Id
//localhost:3000/producto/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del videojuego
    let idBodega=parseInt(request.params.id)
    const bodega=await prisma.bodega.findUnique({
        where: { bodegaId: idBodega },
        include:{
            ubicacion: true
        }
    })
    response.json(bodega)
}

//Crear una bodega
module.exports.create = async (request, response, next) => {
    let body=request.body;
    let ubicacion = await prisma.ubicacion.create({
        data:{
            provincia: body.provincia,
            canton: body.canton,
            distrito: body.distrito,
            direccionExacta: body.direccionExacta,
            nombre: body.ubicacion
        }
    })
    const nuevaBodega= await prisma.bodega.create({
        data:{  
           nombre: body.nombre,
           dimensiones: body.dimensiones,
           capacidad: body.capacidad,
           activa: body.activa,
           ubicacionId: ubicacion.id
        }
    })
    response.json(nuevaBodega)
};
//Actualizar un producto
module.exports.update = async (request, response, next) => {
    let bodega = request.body;
    let idBodega = parseInt(request.params.id); 
    //Obtener producto viejo
    const newBodega = await prisma.bodega.update({
      where: {
        id: idBodega,
      },
      data:{
        nombre: body.nombre,
        dimensiones: body.dimensiones,
        capacidad: body.capacidad,
        activa: body.activa,
        ubicacionId: ubicacion.id
     }
    });
    response.json(newBodega);
};