/*
  Warnings:

  - You are about to drop the column `regionId` on the `commercial` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `commercial` DROP FOREIGN KEY `Commercial_regionId_fkey`;

-- AlterTable
ALTER TABLE `commercial` DROP COLUMN `regionId`;

-- CreateTable
CREATE TABLE `CommercialRegion` (
    `commercialId` INTEGER NOT NULL,
    `regionId` INTEGER NOT NULL,

    PRIMARY KEY (`commercialId`, `regionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CommercialRegion` ADD CONSTRAINT `CommercialRegion_commercialId_fkey` FOREIGN KEY (`commercialId`) REFERENCES `Commercial`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommercialRegion` ADD CONSTRAINT `CommercialRegion_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
