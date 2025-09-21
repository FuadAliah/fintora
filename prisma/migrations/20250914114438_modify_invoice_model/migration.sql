/*
  Warnings:

  - You are about to drop the column `type` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `paymentType` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('cash', 'creditCard', 'bankTransfer', 'other');

-- AlterTable
ALTER TABLE "public"."Invoice" DROP COLUMN "type",
ADD COLUMN     "paymentType" "public"."PaymentType" NOT NULL,
ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';

-- DropEnum
DROP TYPE "public"."InvoiceType";
