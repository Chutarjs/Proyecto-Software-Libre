/*
  Warnings:

  - You are about to drop the column `refrigeracion` on the `bodega` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaId` on the `producto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `producto` DROP FOREIGN KEY `Producto_categoriaId_fkey`;

-- AlterTable
ALTER TABLE `bodega` DROP COLUMN `refrigeracion`;

-- AlterTable
ALTER TABLE `producto` DROP COLUMN `categoriaId`;
