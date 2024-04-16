
import { PrismaClient } from '@prisma/client';
import { subcategorias } from './seeds/subcategorias';
import { categorias } from './seeds/categorias';
import { usuarios } from './seeds/usuarios';
import { ubicaciones } from './seeds/ubicaciones';
import { bodegas } from './seeds/bodegas';
import { proveedores } from './seeds/proveedores';
import { ordenesCompra } from './seeds/ordenesCompra';
import { productoOrdenesCompra } from './seeds/productoOrdenesCompra';
import { encargadoBodega } from './seeds/encargadoBodega';
import { productoBodega } from './seeds/productoBodega';
import { ajusteInventario } from './seeds/ajusteInventario';
import { productoAjusteInventario } from './seeds/productoAjusteInventario';
import { inventario } from './seeds/inventario';


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
    //Ubicaciones - no tiene relaciones
    await prisma.ubicacion.createMany({
        data: ubicaciones,
    });
    //Bodegas 
    await prisma.bodega.createMany({
        data: bodegas,
    });
    //Proveedores 
    await prisma.proveedor.createMany({
        data: proveedores,
    });
    //Encargados
    await prisma.encargadoBodega.createMany({
      data: encargadoBodega,
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
        estado: 'Nueva'
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
          estado: 'Nueva'
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
          estado: 'Nueva'
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
          estado: 'Nueva'
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
          estado: 'Nueva'
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
          estado: 'Nueva'
        },
      });
    //Productos en bodegas
    await prisma.productoBodega.createMany({
      data: productoBodega,
    });
    //Ordenes de Compra 
    await prisma.ordenCompra.createMany({
        data: ordenesCompra,
    });
    //Productos ordenes de Compra 
    await prisma.productoOrdenCompra.createMany({
        data: productoOrdenesCompra,
    });
    //ajuste inventario
    await prisma.ajusteInventario.createMany({
      data: ajusteInventario,
    });
    //producto ajuste inventario
    await prisma.productoAjusteInventario.createMany({
      data: productoAjusteInventario,
    });
    //inventario
    // await prisma.inventario.createMany({
    //   data: inventario,
    // });

  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn('Error al ejecutar el seeder:\n', err);
});
