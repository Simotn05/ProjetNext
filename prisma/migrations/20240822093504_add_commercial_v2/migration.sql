-- DropForeignKey
ALTER TABLE `commercial` DROP FOREIGN KEY `Commercial_regionId_fkey`;

-- AlterTable
ALTER TABLE `commercial` MODIFY `regionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Commercial` ADD CONSTRAINT `Commercial_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
