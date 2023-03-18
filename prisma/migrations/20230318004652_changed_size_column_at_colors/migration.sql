/*
  Warnings:

  - You are about to alter the column `card_background_color` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(15)`.
  - You are about to alter the column `card_text_color` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `card_background_color` VARCHAR(15) NOT NULL,
    MODIFY `card_text_color` VARCHAR(15) NOT NULL;
