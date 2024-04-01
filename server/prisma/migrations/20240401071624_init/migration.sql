/*
  Warnings:

  - You are about to drop the column `distritoId` on the `proveedor` table. All the data in the column will be lost.
  - You are about to drop the `canton` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `distrito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `provincia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `canton` to the `Proveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distrito` to the `Proveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provincia` to the `Proveedor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `canton` DROP FOREIGN KEY `Canton_idProvincia_fkey`;

-- DropForeignKey
ALTER TABLE `distrito` DROP FOREIGN KEY `Distrito_idCanton_fkey`;

-- DropForeignKey
ALTER TABLE `proveedor` DROP FOREIGN KEY `Proveedor_distritoId_fkey`;

-- AlterTable
ALTER TABLE `proveedor` DROP COLUMN `distritoId`,
    ADD COLUMN `canton` VARCHAR(191) NOT NULL,
    ADD COLUMN `distrito` VARCHAR(191) NOT NULL,
    ADD COLUMN `provincia` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `canton`;

-- DropTable
DROP TABLE `distrito`;

-- DropTable
DROP TABLE `provincia`;
