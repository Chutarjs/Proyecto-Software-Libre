import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Seed Usuarios
    await prisma.usuario.createMany({
      data: [
        {
          nombre: 'Usuario1',
          correoElectronico: 'usuario1@example.com',
          contrasena: 'contrasena1',
          rol: 'CLIENTE',
          habilitado: true,
        },
        {
          nombre: 'Usuario2',
          correoElectronico: 'usuario2@example.com',
          contrasena: 'contrasena2',
          rol: 'EMPLEADO',
          habilitado: true,
        },
        {
          nombre: 'Usuario3',
          correoElectronico: 'usuario3@example.com',
          contrasena: 'contrasena3',
          rol: 'ADMINISTRADOR',
          habilitado: true,
        },
      ],
    });

    // Seed Productos
    await prisma.producto.createMany({
      data: [
        {
          sku: 'SKU001',
          nombre: 'Producto1',
          descripcion: 'Descripción del producto 1',
          costoUnitario: 10.50,
          subcategoriaId: 1,
          mesesGarantia: 12,
          estado: 'Nuevo',
          cantidadStock: 100,
          cantidadMinima: 10,
          cantidadMaxima: 200,
        },
        // Agrega más productos aquí
      ],
    });

    // Agrega más seeders para otras tablas aquí

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
