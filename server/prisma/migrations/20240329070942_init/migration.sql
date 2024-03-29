/*
  Warnings:

  - You are about to drop the column `cantidadMaxima` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `cantidadMinima` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `cantidadStock` on the `producto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `producto` DROP COLUMN `cantidadMaxima`,
    DROP COLUMN `cantidadMinima`,
    DROP COLUMN `cantidadStock`;

-- CreateTable
CREATE TABLE `Inventario` (
    `bodegaId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidadStock` INTEGER NOT NULL DEFAULT 0,
    `cantidadMinima` INTEGER NOT NULL,
    `cantidadMaxima` INTEGER NOT NULL,

    PRIMARY KEY (`bodegaId`, `productoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_bodegaId_fkey` FOREIGN KEY (`bodegaId`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
