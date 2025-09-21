/*
  Warnings:

  - Added the required column `arabicName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `englishName` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Invoice" ADD COLUMN     "arabicName" TEXT NOT NULL,
ADD COLUMN     "englishName" TEXT NOT NULL,
ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';
