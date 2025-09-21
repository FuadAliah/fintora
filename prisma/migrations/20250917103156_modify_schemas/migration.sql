/*
  Warnings:

  - You are about to drop the column `price` on the `ProductOnInvoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';

-- AlterTable
ALTER TABLE "public"."ProductOnInvoice" DROP COLUMN "price",
ADD COLUMN     "subTotal" DECIMAL(10,3) NOT NULL DEFAULT 0,
ADD COLUMN     "taxAmount" DECIMAL(10,3) NOT NULL DEFAULT 0,
ADD COLUMN     "totalProductPrice" DECIMAL(10,3) NOT NULL DEFAULT 0;
