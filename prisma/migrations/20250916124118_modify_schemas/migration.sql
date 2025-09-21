-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "description" TEXT,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "tax" DECIMAL(65,30) NOT NULL,
    "invoiceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "public"."Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
