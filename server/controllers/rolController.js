const { PrismaClient, Rol } = require("@prisma/client");
 
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listRoles = [];
  for (let element in Rol) {
    switch (element) {
      case Rol.ADMINISTRADOR:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Administrador",
        });
        break;
      case Rol.CLIENTE:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Cliente",
        });
        break;
      case Rol.EMPLEADO:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Empleado",
        });
        break;
      default:
        listRoles.unshift({ ["id"]: Rol.USER, ["nombre"]: "Usuario" });
        break;
    }
  }

  response.json(listRoles);
};
module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  let nombre = "";
  switch (Rol[id]) {
    case Rol.ADMINISTRADOR:
      nombre = "Administrador";
      break;
    case Rol.CLIENTE:
      nombre = "Cliente";
      break;
    case Rol.EMPLEADO:
      nombre = "Empleado";
      break;
    default:
      nombre = "Cliente";
      break;
  }
  let rol = { ["id"]: Rol[id], ["nombre"]: nombre };
  response.json(rol);
};
