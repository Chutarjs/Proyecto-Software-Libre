const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los productos
module.exports.get =async (request,response, next)=>{
    const productos= await prisma.producto.findMany({
        orderBy:{
            nombre:'asc'
        } ,         
        include:{
            subcategoria: {
                select: {
                    id:true,
                    nombre:true,
                    categoria:true
                }
            }
        }
    })
    
    // Función para determinar el estado según la cantidad en stock
    const determinarEstado = (cantidad, minima, maxima) => {
        if (cantidad > maxima) {
            return "Excede";
        } else if (cantidad < minima) {
            return "Falta Stock";
        } else {
            return "Correcto";
        }
    };

    // Mapeo para agregar el estado a cada producto
    const productosConEstado = productos.map(producto => ({
        ...producto,
        estado: determinarEstado(producto.cantidadStock, producto.cantidadMinima, producto.cantidadMaxima)
    }));

    response.json(productosConEstado);
}
//Obtener por Id
//localhost:3000/producto/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del videojuego
    let idProducto=parseInt(request.params.id)
    const producto=await prisma.producto.findUnique({
        where: { id: idProducto },
        include:{
            subcategoria:true,
        }
    })
    response.json(producto)

}

//Crear un producto
module.exports.create = async (request, response, next) => {
};
//Actualizar un producto
module.exports.update = async (request, response, next) => {
};