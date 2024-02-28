/*
  Warnings:

  - You are about to drop the column `rolId` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `activa` to the `Bodega` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bodega` ADD COLUMN `activa` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `rolId`;

-- CreateTable
CREATE TABLE `Inventario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventarioProducto` (
    `inventarioId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`inventarioId`, `productoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InventarioProducto` ADD CONSTRAINT `InventarioProducto_inventarioId_fkey` FOREIGN KEY (`inventarioId`) REFERENCES `Inventario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventarioProducto` ADD CONSTRAINT `InventarioProducto_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
