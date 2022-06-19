/*
  Warnings:

  - Added the required column `desription` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` ADD COLUMN `desription` VARCHAR(100) NOT NULL;
