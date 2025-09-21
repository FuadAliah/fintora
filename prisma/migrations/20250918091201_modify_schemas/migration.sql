/*
  Warnings:

  - You are about to drop the column `subTotal` on the `ProductOnInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `totalProductPrice` on the `ProductOnInvoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';

-- AlterTable
ALTER TABLE "public"."ProductOnInvoice" DROP COLUMN "subTotal",
DROP COLUMN "totalProductPrice",
ADD COLUMN     "productTax" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "totalPrice" DECIMAL(10,3) NOT NULL DEFAULT 0;
