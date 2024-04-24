const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const { Rol } = require("@prisma/client");
const jwt = require("jsonwebtoken");
//npm install bcrypt
const bcrypt = require("bcrypt");
//Crear nuevo usuario
module.exports.register = async (request, response, next) => {
    const userData = request.body;
  
    //Salt es una cadena aleatoria.
    //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
    // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
    let salt= bcrypt.genSaltSync(10);
    // Hash password
    let hash=bcrypt.hashSync(userData.contrasena,salt);
    const user = await prisma.usuario.create({
      data: {
        nombre: userData.nombre,
        correoElectronico: userData.correoElectronico,
        contrasena: hash,
        rol: Rol[userData.rol]
      },
    });
    response.status(200).json({
      status: true,
      message: "Usuario creado",
      data: user,
    });
  };


  module.exports.login = async (request, response, next) => {
    let userReq = request.body;
    //Buscar el usuario según el email dado
    const user = await prisma.usuario.findFirst({
      where: {
        correoElectronico: userReq.correoElectronico,
      },
    });
    //Sino lo encuentra según su email
    if (!user) {
      response.status(401).send({
        success: false,
        message: "Usuario no registrado",
      });
    }
    let salt= bcrypt.genSaltSync(10);
    // // Hash password
    // console.log(user);
    // console.log(userReq);
    //Verifica la contraseña
    const checkPassword=await bcrypt.compare(userReq.contrasena, user.contrasena);
    if(checkPassword === false){
      response.status(401).send({
        success:false,
        message: "Credenciales no validas"
      })
    }else{ 
      //Usuario correcto 
      //Crear el payload
      const payload={
        id: user.id,
        correoElectronico: user.correoElectronico,
        rol: user.rol
      }
      //Crear el token
      const token= jwt.sign(payload,process.env.SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE
      });
      response.json({
        success: true,
        message: "Usuario registrado",
        token: token,
          
      })
    }
  };


  //Listar todos los usuarios
module.exports.get =async (request,response, next)=>{
  const usuarios= await prisma.usuario.findMany({
      orderBy:{
          id:'asc'
      }
  })
  response.json(usuarios);
}


//Obtener por Id
//localhost:3000/usuario/2
module.exports.getById = async (request, response, next) => {
  //Parámetro con el id del usuario
  let idUsuario=parseInt(request.params.id)
  const usuario = await prisma.usuario.findUnique({
      where: { id: idUsuario }
  })
  response.json(usuario)
}
  

//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let usuario = request.body; 
  //Obtener usuario viejo
  const usuarioViejo = await prisma.usuario.findFirst({
    where: { id : usuario.id}
  }); 
  const newUsuario = await prisma.usuario.updateMany({
    where: {
      id: usuarioViejo.id
    },
    data:{
      correoElectronico: usuario.correoElectronico,
      contrasena: usuario.contrasena,
      habilitado: usuario.habilitado,
      nombre: usuario.nombre,
      rol: usuario.rol == "Administrador"? Rol.ADMINISTRADOR: usuario.rol == "Empleado"? Rol.EMPLEADO: Rol.CLIENTE
   }
  });
  response.json(newUsuario);
};