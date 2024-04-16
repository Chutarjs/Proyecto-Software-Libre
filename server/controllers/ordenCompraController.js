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
    // Obtener la fecha actual que es la fecha de recepcion
    const fechaActual = new Date();
    //Añade la fecha de recepcion
    const newOrden = await prisma.ordenCompra.update({
      where: { 
        id: parseInt(request.params.id),
      },
      data:{
        fechaRecibida: fechaActual,
     }
    }); 

    response.json(newOrden);

    //se añaden los productos al inventario
    let inventario = request.body; 
    let idBodega = parseInt(request.body.bodegaId);
    for(var product in inventario.productos){
        let idProducto = parseInt(request.body.productos[product].producto.id);
        //Obtener inventario si existe
        let inventarioViejo = await prisma.inventario.findFirst({ 
            where: { bodegaId: idBodega, productoId: idProducto} 
        }); 
        if(inventarioViejo == null){
            const nuevoInventario= await prisma.inventario.create({
                data:{ 
                    cantidadStock: parseInt(request.body.productos[product].cantidad),
                    cantidadMaxima: 10000,
                    cantidadMinima: 0,
                    bodegaId: idBodega,
                    productoId: idProducto
                }
            })
            // response.json(nuevoInventario)
        }
        else    
        { 
            const newInventario = await prisma.inventario.updateMany({
            where: {
                bodegaId: idBodega, 
                productoId: idProducto
            }, 
            data:{
                cantidadStock: parseInt(request.body.productos[product].cantidad) + parseInt(inventarioViejo.cantidadStock),
            }
            });
            // response.json(newInventario);
        }
        
        //ajustes
    }   
};  