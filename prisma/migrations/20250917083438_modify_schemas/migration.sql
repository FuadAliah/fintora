/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_invoiceId_fkey";

-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "invoiceId";

-- AlterTable
ALTER TABLE "public"."ProductOnInvoice" ADD COLUMN     "invoiceId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."ProductOnInvoice" ADD CONSTRAINT "ProductOnInvoice_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "public"."Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
