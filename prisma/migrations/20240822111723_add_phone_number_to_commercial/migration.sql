/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `Commercial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `Commercial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `commercial` ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Commercial_phoneNumber_key` ON `Commercial`(`phoneNumber`);
