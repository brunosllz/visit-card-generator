/*
  Warnings:

  - Added the required column `card_background_color` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_text_color` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `card_background_color` VARCHAR(191) NOT NULL,
    ADD COLUMN `card_text_color` VARCHAR(191) NOT NULL;
