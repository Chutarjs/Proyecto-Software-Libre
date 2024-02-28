import { Rol } from "@prisma/client";
export const usuarios = [
  //Usuario 1 
  {
    id: 1,
    nombre: "Admin1",
    correoElectronico: "admin1@prueba.com",
    contrasena: "1234",
    rol: Rol.ADMINISTRADOR,
    habilitado: true
  },
  //Usuario 2 
  {
    id: 2,
    nombre: "Cliente1",
    correoElectronico: "cliente1@prueba.com",
    contrasena: "12345",
    rol: Rol.CLIENTE,
    habilitado: true
  },
  //Usuario 3 
  {
    id: 3,
    nombre: "Empleado1",
    correoElectronico: "empleado1@prueba.com",
    contrasena: "123456",
    rol: Rol.EMPLEADO,
    habilitado: true
  },
];
