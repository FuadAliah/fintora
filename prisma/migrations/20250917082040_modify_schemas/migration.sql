/*
  Warnings:

  - You are about to alter the column `tax` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,3)`.

*/
-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';

-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "tax" SET DATA TYPE DECIMAL(10,3);
