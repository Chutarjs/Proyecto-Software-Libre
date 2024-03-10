/*
  Warnings:

  - You are about to drop the `inventario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventarioproducto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `inventarioproducto` DROP FOREIGN KEY `InventarioProducto_inventarioId_fkey`;

-- DropForeignKey
ALTER TABLE `inventarioproducto` DROP FOREIGN KEY `InventarioProducto_productoId_fkey`;

-- DropTable
DROP TABLE `inventario`;

-- DropTable
DROP TABLE `inventarioproducto`;

-- CreateTable
CREATE TABLE `ProductoBodega` (
    `productoId` INTEGER NOT NULL,
    `bodegaId` INTEGER NOT NULL,

    PRIMARY KEY (`productoId`, `bodegaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductoBodega` ADD CONSTRAINT `ProductoBodega_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoBodega` ADD CONSTRAINT `ProductoBodega_bodegaId_fkey` FOREIGN KEY (`bodegaId`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
