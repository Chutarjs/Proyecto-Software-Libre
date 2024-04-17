const { PrismaClient, TipoMovimiento } = require('@prisma/client');
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
            productos:{
                include:{
                    producto:true
                }
            },
        }
    })
    response.json(ajuste)
}

//Crear un ajuste
module.exports.create = async (request, response, next) => {
    let body=request.body;
    const nuevoAjuste = await prisma.ajusteInventario.create({
        data:{  
            bodegaId: body.bodega, 
            usuarioId: body.usuario,
            fecha: body.fechaCreacion,
            tipoMovimiento: body.tipoMovimiento == "Entrada"? TipoMovimiento.ENTRADA: TipoMovimiento.SALIDA,
            justificacion: body.justificacion,
            // productos: {
            //     connect: body.productos.map(producto => ({ id: producto.id }))        
            // }
        }
    })
    for(var producto in body.productos){
        var cantidad = body.productos[producto].cantidad
        const nuevoProductoAjuste = await prisma.productoAjusteInventario.create({
            data:{
                ajusteInventarioId: nuevoAjuste.id,
                productoId: body.productos[producto].id,
                cantidad: cantidad
            }
        })
        console.log(nuevoProductoAjuste)
    }
    response.json(nuevoAjuste) 


};  