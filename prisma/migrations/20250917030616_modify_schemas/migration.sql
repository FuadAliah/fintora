/*
  Warnings:

  - You are about to drop the column `customer` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceId` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `unitPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,3)`.
  - Added the required column `customerId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Invoice" DROP COLUMN "customer",
ADD COLUMN     "customerId" TEXT NOT NULL,
ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "invoiceId",
ALTER COLUMN "unitPrice" SET DATA TYPE DECIMAL(10,3);

-- CreateTable
CREATE TABLE "public"."Customer" (
    "id" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "public"."Customer"("email");

-- AddForeignKey
ALTER TABLE "public"."Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
