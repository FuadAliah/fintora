/*
  Warnings:

  - The values [draft,issued,canceled] on the enum `InvoiceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [paid,unpaid,partiallyPaid] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [cash,creditCard,bankTransfer,other] on the enum `PaymentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."InvoiceStatus_new" AS ENUM ('DRAFT', 'ISSUED', 'CANCELED');
ALTER TABLE "public"."Invoice" ALTER COLUMN "status" TYPE "public"."InvoiceStatus_new" USING ("status"::text::"public"."InvoiceStatus_new");
ALTER TYPE "public"."InvoiceStatus" RENAME TO "InvoiceStatus_old";
ALTER TYPE "public"."InvoiceStatus_new" RENAME TO "InvoiceStatus";
DROP TYPE "public"."InvoiceStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."PaymentStatus_new" AS ENUM ('PAID', 'UNPAID', 'PARTIALLY_PAID');
ALTER TABLE "public"."Invoice" ALTER COLUMN "paymentStatus" TYPE "public"."PaymentStatus_new" USING ("paymentStatus"::text::"public"."PaymentStatus_new");
ALTER TYPE "public"."PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "public"."PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "public"."PaymentStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."PaymentType_new" AS ENUM ('CASH', 'CARD', 'BANK_TRANSFER', 'OTHER');
ALTER TABLE "public"."Invoice" ALTER COLUMN "paymentType" TYPE "public"."PaymentType_new" USING ("paymentType"::text::"public"."PaymentType_new");
ALTER TYPE "public"."PaymentType" RENAME TO "PaymentType_old";
ALTER TYPE "public"."PaymentType_new" RENAME TO "PaymentType";
DROP TYPE "public"."PaymentType_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';
