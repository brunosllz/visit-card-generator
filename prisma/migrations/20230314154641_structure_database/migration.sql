-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `github` VARCHAR(191) NOT NULL,
    `linkedin` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
