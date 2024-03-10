/*
  Warnings:

  - You are about to drop the `_bodegatousuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_bodegatousuario` DROP FOREIGN KEY `_BodegaToUsuario_A_fkey`;

-- DropForeignKey
ALTER TABLE `_bodegatousuario` DROP FOREIGN KEY `_BodegaToUsuario_B_fkey`;

-- DropTable
DROP TABLE `_bodegatousuario`;

-- CreateTable
CREATE TABLE `EncargadoBodega` (
    `usuarioId` INTEGER NOT NULL,
    `bodegaId` INTEGER NOT NULL,

    PRIMARY KEY (`usuarioId`, `bodegaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EncargadoBodega` ADD CONSTRAINT `EncargadoBodega_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncargadoBodega` ADD CONSTRAINT `EncargadoBodega_bodegaId_fkey` FOREIGN KEY (`bodegaId`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
