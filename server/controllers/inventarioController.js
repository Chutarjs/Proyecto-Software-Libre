const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los productos
module.exports.get =async (request,response, next)=>{
    const inventario = await prisma.inventario.findMany({
       include:{
        producto:true,
        bodega:{
            select:{
                capacidad:true,
                encargados:true,
                ubicacion:true,
                nombre:true,
                ajusteInventario:{
                    select:{
                        tipoMovimiento:true,
                        productos:{
                            select:{
                                producto:true,
                                cantidad:true
                            }
                        }
                    }
                }
            }
        }
    }
    })
    response.json(inventario)
}
//Obtener por Id
//localhost:3000/producto/2/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del videojuego
    let idBodega=parseInt(request.params.idBodega)
    let idProducto=parseInt(request.params.idProducto)
    const inventarioBodega=await prisma.inventario.findMany({
        where: { bodegaId: idBodega, productoId: idProducto },
        include:{
            producto:{
                include:{
                    ProductoAjusteInventario:{
                        include:{
                            ajusteInventario:{
                                include:{
                                    usuario:true
                                }
                            }
                        }
                    }
                }
            },
            bodega:{
                select:{
                    ubicacion:true,
                    capacidad:true,
                    encargados:true,
                    nombre:true,
                    ajusteInventario:{
                        select:{
                            tipoMovimiento:true,
                            productos:{
                                select:{
                                    producto:true,
                                    cantidad:true,
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    response.json(inventarioBodega)
}
//Crear un inventario
module.exports.create = async (request, response, next) => {
    //insertar en una bodega un producto (con su cantidad), validando que el producto no supere la cantidad minima y maxima de existencias
    let body=request.body;
    console.log(body);
    const nuevoInventario= await prisma.inventario.create({
        data:{
           cantidadStock: body.cantidadStock,
           cantidadMaxima: body.cantidadMaxima,
           cantidadMinima: body.cantidadMinima,
           bodega: {
            connect: { id: body.bodegas } // Assuming you have a unique identifier for bodega, replace `body.bodegaId` with the actual unique identifier
        },
        producto: {
            connect: { id: body.productos } // Assuming you have a unique identifier for producto, replace `body.productoId` with the actual unique identifier
        }
        }
    })
    response.json(nuevoInventario)
};
//Actualizar un producto
module.exports.update = async (request, response, next) => {
    //Modificar inventario: el usuario de poder actualizar el inventario seleccionado, precargado toda la información solicitada,
    //con los valores iniciales correctos y actualizar todos los aspectos antes listados en crear, además de los siguientes aspectos:
    //• Cantidad de producto disponible: no editable al actualizar
    //• Usuario que realizo el registro: al actualizar no se debe realizar ningún cambio en este campo
    //• Usuario que actualizó por última vez: asigne otro usuario por defecto, diferente al que registro
    let inventario = request.body;
    console.log(inventario); 
    let idBodega = parseInt(inventario.bodegas);
    let idProducto = parseInt(inventario.productos);
    //Obtener inventario viejo
    const inventarioViejo = await prisma.inventario.findFirst({
      where: { bodegaId: idBodega, productoId: idProducto}
    }); 
    console.log(inventarioViejo);
    const newInventario = await prisma.inventario.updateMany({
      where: {
        productoId: idProducto,
        bodegaId: idBodega
      },
      data:{
        cantidadStock: inventario.cantidadStock,
        cantidadMaxima: inventario.cantidadMaxima,
        cantidadMinima: inventario.cantidadMinima,
     }
    });
    response.json(newInventario);
};