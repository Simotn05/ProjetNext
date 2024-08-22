/*
  Warnings:

  - Made the column `regionId` on table `commercial` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `commercial` DROP FOREIGN KEY `Commercial_regionId_fkey`;

-- AlterTable
ALTER TABLE `commercial` MODIFY `regionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Commercial` ADD CONSTRAINT `Commercial_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
