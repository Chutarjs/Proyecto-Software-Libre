const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar todos los proveedores
module.exports.get =async (request,response, next)=>{
    const proveedores = await prisma.proveedor.findMany({
        orderBy:{
            nombre:'asc'
        } ,         
        include:{
            ordenesCompra:true
        }
    })
    response.json(proveedores)
}
    
//Obtener por Id
//localhost:3000/proveedor/2
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del proveedor
    let idProveedor=parseInt(request.params.id)
    const proveedor=await prisma.proveedor.findUnique({
        where: { id: idProveedor },
        include:{
            ordenesCompra: true
        }
    })
    response.json(proveedor)
}

//Crear un proveedor
module.exports.create = async (request, response, next) => {
    let body=request.body;
    console.log(body);
    const nuevoProveedor= await prisma.proveedor.create({
        data:{
            nombre: body.nombre,
            direccion: body.direccion,
            provincia: body.provincia,
            canton: body.canton,
            distrito: body.distrito,
            correoElectronico: body.correoElectronico,
            numeroTelefono: body.numeroTelefono
        }
    })
    response.json(nuevoProveedor)
};
//Actualizar un proveedor
module.exports.update = async (request, response, next) => {
    let proveedor = request.body;
    let idProveedor = parseInt(request.params.id);
    //Obtener producto viejo
    const newProveedor = await prisma.proveedor.update({
      where: {
        id: idProveedor,
      },
      data:{
        nombre: proveedor.nombre,
        direccion: proveedor.direccion,
        provincia: proveedor.provincia,
        canton: proveedor.canton,
        distrito: proveedor.distrito,
        correoElectronico: proveedor.correoElectronico,
        numeroTelefono: proveedor.numeroTelefono
    }
    });
    response.json(newProveedor);
};