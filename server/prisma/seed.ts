
import { PrismaClient } from '@prisma/client';
import { subcategorias } from './seeds/subcategorias';
import { categorias } from './seeds/categorias';
import { usuarios } from './seeds/usuarios';

const prisma = new PrismaClient();

const main = async () => {
  try {
    //Categorias - no tiene relaciones
    await prisma.categoria.createMany({
      data: categorias,
    });
    //Categorias - no tiene relaciones
    await prisma.subcategoria.createMany({
        data: subcategorias,
    });
    //Usuarios - no tiene relaciones
    await prisma.usuario.createMany({
      data: usuarios,
    });

    //Productos
    await prisma.producto.create({
      //Instancia de producto 1
      data: {
        sku: "RTX-3800",
        nombre: 'Nvidia RTX 3080',
        descripcion:
          'Grafica de ultima generacion',
        costoUnitario: 500.00,
        subcategoriaId: 1,
        mesesGarantia: 3,
        estado: 'Nueva',
        cantidadStock: 30,
        cantidadMinima: 5,
        cantidadMaxima: 100
      },
    });

    await prisma.producto.create({
        //Instancia de producto 2
        data: {
          sku: "RX-6600",
          nombre: 'AMD RX 6600',
          descripcion:
            'Grafica de ultima generacion de AMD',
          costoUnitario: 300.00,
          subcategoriaId: 2,
          mesesGarantia: 4,
          estado: 'Nueva',
          cantidadStock: 40,
          cantidadMinima: 3,
          cantidadMaxima: 130
        },
      });

      await prisma.producto.create({
        //Instancia de producto 3
        data: {
          sku: "X670E-A",
          nombre: 'ASUS ROG STRIX X670E-A GAMING WIFI - SOCKET AM5',
          descripcion:
            'Motherboard Asus AM5',
          costoUnitario: 550.00,
          subcategoriaId: 3,
          mesesGarantia: 2,
          estado: 'Nueva',
          cantidadStock: 10,
          cantidadMinima: 2,
          cantidadMaxima: 200
        },
      });
      await prisma.producto.create({
        //Instancia de producto 1
        data: {
          sku: "Z790",
          nombre: 'GIGABYTE Z790 AORUS ELITE AX G10 - SOCKET 1700',
          descripcion:
            'Motherboard Gigabyte 1700',
          costoUnitario: 480.00,
          subcategoriaId: 4,
          mesesGarantia: 7,
          estado: 'Nueva',
          cantidadStock: 80,
          cantidadMinima: 15,
          cantidadMaxima: 90
        },
      });
      await prisma.producto.create({
        //Instancia de producto 5
        data: {
          sku: "I7-14700K",
          nombre: 'CORE I7-14700K - 1700',
          descripcion:
            'I7 de 14 generacion',
          costoUnitario: 700.00,
          subcategoriaId: 5,
          mesesGarantia: 12,
          estado: 'Nueva',
          cantidadStock: 10,
          cantidadMinima: 5,
          cantidadMaxima: 150
        },
      });
      await prisma.producto.create({
        //Instancia de producto 6
        data: {
          sku: "R5-7600",
          nombre: 'AMD RYZEN 5 7600 - AM5',
          descripcion:
            'RYZEN 5 7600 - AM5',
          costoUnitario: 320.00,
          subcategoriaId: 6,
          mesesGarantia: 10,
          estado: 'Nueva',
          cantidadStock: 40,
          cantidadMinima: 4,
          cantidadMaxima: 120
        },
      });

    // //Ordenes
    // await prisma.orden.create({
    //   data: {
    //     fechaOrden: new Date('2024-02-27'),
    //     usuarioId: 4,
    //     videojuegos: {
    //       createMany: {
    //         data: [
    //           { cantidad: 1, videojuegoId: 1 },
    //           { cantidad: 2, videojuegoId: 4 },
    //         ],
    //       },
    //     },
    //   },
    // });
    // await prisma.orden.create({
    //   data: {
    //     fechaOrden: new Date('2024-03-30'),
    //     usuarioId: 3,
    //     videojuegos: {
    //       createMany: {
    //         data: [{ cantidad: 1, videojuegoId: 2 }],
    //       },
    //     },
    //   },
    // });
    // await prisma.orden.create({
    //   data: {
    //     fechaOrden: new Date('2024-4-20'),
    //     usuarioId: 2,
    //     videojuegos: {
    //       createMany: {
    //         data: [
    //           { cantidad: 1, videojuegoId: 1 },
    //           { cantidad: 1, videojuegoId: 3 },
    //         ],
    //       },
    //     },
    //   },
    // });
    // await prisma.orden.create({
    //   data: {
    //     fechaOrden: new Date('2024-3-27'),
    //     usuarioId: 2,
    //     videojuegos: {
    //       createMany: {
    //         data: [
    //           { cantidad: 1, videojuegoId: 4 },
    //           { cantidad: 1, videojuegoId: 3 },
    //         ],
    //       },
    //     },
    //   },
    // });
    // await prisma.orden.create({
    //   data: {
    //     fechaOrden: new Date('2024-5-02'),
    //     usuarioId: 1,
    //     videojuegos: {
    //       createMany: {
    //         data: [{ cantidad: 1, videojuegoId: 4 }],
    //       },
    //     },
    //   },
    // });
    // await prisma.orden.create({
    //   data: {
    //     fechaOrden: new Date('2024-5-05'),
    //     usuarioId: 4,
    //     videojuegos: {
    //       createMany: {
    //         data: [{ cantidad: 1, videojuegoId: 3 }],
    //       },
    //     },
    //   },
    // });
    // await prisma.orden.create({
    //   data: {
    //     fechaOrden: new Date('2024-4-15'),
    //     usuarioId: 3,
    //     videojuegos: {
    //       createMany: {
    //         data: [
    //           { cantidad: 1, videojuegoId: 2 },
    //           { cantidad: 1, videojuegoId: 1 },
    //         ],
    //       },
    //     },
    //   },
    // });
    // await prisma.orden.create({
    //   data: {
    //     fechaOrden: new Date('2024-4-02'),
    //     usuarioId: 4,
    //     videojuegos: {
    //       createMany: {
    //         data: [
    //           { cantidad: 1, videojuegoId: 3 },
    //           { cantidad: 1, videojuegoId: 4 },
    //         ],
    //       },
    //     },
    //   },
    // });
  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn('Error al ejecutar el seeder:\n', err);
});
