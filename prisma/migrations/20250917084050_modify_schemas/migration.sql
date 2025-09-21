-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';

-- AlterTable
ALTER TABLE "public"."ProductOnInvoice" ADD COLUMN     "productId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."ProductOnInvoice" ADD CONSTRAINT "ProductOnInvoice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
