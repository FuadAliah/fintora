/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `ProductOnInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductOnInvoice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ProductOnInvoice" DROP CONSTRAINT "ProductOnInvoice_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductOnInvoice" DROP CONSTRAINT "ProductOnInvoice_productId_fkey";

-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "invoiceId" TEXT;

-- AlterTable
ALTER TABLE "public"."ProductOnInvoice" DROP COLUMN "invoiceId",
DROP COLUMN "productId";

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "public"."Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
