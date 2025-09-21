/*
  Warnings:

  - You are about to drop the column `cutomer` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `customer` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Invoice" DROP COLUMN "cutomer",
ADD COLUMN     "customer" TEXT NOT NULL,
ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';
