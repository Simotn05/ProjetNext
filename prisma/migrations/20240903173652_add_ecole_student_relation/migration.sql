-- AlterTable
ALTER TABLE `etudiant` ADD COLUMN `ecoleId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Ecole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Ecole_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LicenseType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehiclePerType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicleType` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `ecoleId` INTEGER NOT NULL,
    `licenseTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EcoleLicenseTypes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EcoleLicenseTypes_AB_unique`(`A`, `B`),
    INDEX `_EcoleLicenseTypes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Etudiant` ADD CONSTRAINT `Etudiant_ecoleId_fkey` FOREIGN KEY (`ecoleId`) REFERENCES `Ecole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehiclePerType` ADD CONSTRAINT `VehiclePerType_ecoleId_fkey` FOREIGN KEY (`ecoleId`) REFERENCES `Ecole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehiclePerType` ADD CONSTRAINT `VehiclePerType_licenseTypeId_fkey` FOREIGN KEY (`licenseTypeId`) REFERENCES `LicenseType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EcoleLicenseTypes` ADD CONSTRAINT `_EcoleLicenseTypes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ecole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EcoleLicenseTypes` ADD CONSTRAINT `_EcoleLicenseTypes_B_fkey` FOREIGN KEY (`B`) REFERENCES `LicenseType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
