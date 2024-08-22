-- AlterTable
ALTER TABLE `etudiant` ADD COLUMN `commercialId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Commercial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Commercial_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Etudiant` ADD CONSTRAINT `Etudiant_commercialId_fkey` FOREIGN KEY (`commercialId`) REFERENCES `Commercial`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
