/*
  Warnings:

  - Added the required column `drivingLicenseType` to the `Etudiant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `etudiant` ADD COLUMN `drivingLicenseType` VARCHAR(191) NOT NULL;
