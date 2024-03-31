/*
  Warnings:

  - You are about to drop the column `canton` on the `proveedor` table. All the data in the column will be lost.
  - You are about to drop the column `distrito` on the `proveedor` table. All the data in the column will be lost.
  - You are about to drop the column `provincia` on the `proveedor` table. All the data in the column will be lost.
  - Added the required column `distritoId` to the `Proveedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `proveedor` DROP COLUMN `canton`,
    DROP COLUMN `distrito`,
    DROP COLUMN `provincia`,
    ADD COLUMN `distritoId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Provincia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Canton` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `idProvincia` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Distrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `idCanton` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Proveedor` ADD CONSTRAINT `Proveedor_distritoId_fkey` FOREIGN KEY (`distritoId`) REFERENCES `Distrito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Canton` ADD CONSTRAINT `Canton_idProvincia_fkey` FOREIGN KEY (`idProvincia`) REFERENCES `Provincia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Distrito` ADD CONSTRAINT `Distrito_idCanton_fkey` FOREIGN KEY (`idCanton`) REFERENCES `Canton`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
