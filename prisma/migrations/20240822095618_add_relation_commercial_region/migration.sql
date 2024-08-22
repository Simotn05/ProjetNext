/*
  Warnings:

  - Added the required column `regionId` to the `Commercial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `commercial` ADD COLUMN `regionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Commercial` ADD CONSTRAINT `Commercial_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
