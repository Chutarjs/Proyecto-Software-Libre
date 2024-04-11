const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const ordenes=await prisma.ordenCompra.findMany({
        orderBy:{
            fechaGeneracion: 'asc'
        },
        include:{ 
            bodega:true,
            proveedor: true,
            productos: {
                select:{
                    producto:true,
                    cantidad:true,
                }                
            } 
        }
    })
    response.json(ordenes)
} 
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let idOrden=parseInt(request.params.id)
    const orden=await prisma.ordenCompra.findUnique({
        where: { id: idOrden },
        include:{
            bodega:true,
            proveedor:true,
            productos: {
                select:{
                    producto:true,
                    cantidad:true,
                }
            }
        }
    })
    response.json(orden)
}
//Crear una orden
module.exports.create = async (request, response, next) => {
    let body=request.body;

    const nuevaOrden= await prisma.ordenCompra.create({
        data:{
           fechaGeneracion: body.fechaCreacion,  
           proveedor:{
            connect:{ id: body.proveedor}
           },
           bodega:{
            connect:{ 
                id: body.bodega
            }
           }, 
           productos: { // Array de productos a conectar
            create: body.productos.map(producto => ({
                producto: { connect: { id: producto.id } },
                cantidad: producto.cantidad
            }))
            },
        }
    })
    response.json(nuevaOrden)
}; 
//Actualizar una orden
module.exports.update = async (request, response, next) => {
    console.log("Orden: " + request);
    // Obtener la fecha actual
    const fechaActual = new Date();
    //Obtener producto viejo
    const newOrden = await prisma.ordenCompra.update({
      where: {
        id: parseInt(request.params.id),
      },
      data:{
        fechaRecibida: fechaActual,
     }
    });

    response.json(newOrden)
};