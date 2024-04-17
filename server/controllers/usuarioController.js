const { PrismaClient, Rol } = require('@prisma/client');
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

//Crear un proveedor
module.exports.create = async (request, response, next) => {
    let body=request.body;
    console.log(body);
    const nuevoUsuario= await prisma.usuario.create({
        data:{
            id: body.id,
            nombre: body.nombre,
            correoElectronico: body.correoElectronico,
            contrasena: body.contrasena,
            rol: body.rol == "Cliente"? Rol.CLIENTE: body.rol == "Empleado"? Rol.EMPLEADO: Rol.ADMINISTRADOR,
        }
    })
    response.json(nuevoUsuario)
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
    let usuario = request.body;
    let idUsuario = parseInt(request.params.id);
    //Obtener usuario viejo
    const newUsuario = await prisma.usuario.update({
      where: {
        id: idUsuario,
      },
      data:{
        nombre: usuario.nombre,
        correoElectronico: usuario.correoElectronico,
        contrasena: usuario.contrasena,
        rol: usuario.rol == "Cliente"? Rol.CLIENTE: usuario.rol == "Empleado"? Rol.EMPLEADO: Rol.ADMINISTRADOR,
    }
    });
    response.json(newUsuario);
};