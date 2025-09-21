-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_invoiceId_fkey";

-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';

-- CreateTable
CREATE TABLE "public"."ProductOnInvoice" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DECIMAL(10,3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductOnInvoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ProductOnInvoice" ADD CONSTRAINT "ProductOnInvoice_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "public"."Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductOnInvoice" ADD CONSTRAINT "ProductOnInvoice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
