-- AlterTable
ALTER TABLE `ecole` ADD COLUMN `regionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Ecole` ADD CONSTRAINT `Ecole_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
