/*
  Warnings:

  - The values [en,ar] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.
  - The values [admin,accountant,sales,viewer,user] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `arabicName` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `englishName` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `issueDate` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupToRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cutomer` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceStatus` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Language_new" AS ENUM ('EN', 'AR');
ALTER TABLE "public"."User" ALTER COLUMN "defaultLanguage" DROP DEFAULT;
ALTER TABLE "public"."User" ALTER COLUMN "defaultLanguage" TYPE "public"."Language_new" USING ("defaultLanguage"::text::"public"."Language_new");
ALTER TYPE "public"."Language" RENAME TO "Language_old";
ALTER TYPE "public"."Language_new" RENAME TO "Language";
DROP TYPE "public"."Language_old";
ALTER TABLE "public"."User" ALTER COLUMN "defaultLanguage" SET DEFAULT 'EN';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."UserRole_new" AS ENUM ('ADMIN', 'USER');
ALTER TYPE "public"."UserRole" RENAME TO "UserRole_old";
ALTER TYPE "public"."UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."_GroupToRole" DROP CONSTRAINT "_GroupToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_GroupToRole" DROP CONSTRAINT "_GroupToRole_B_fkey";

-- AlterTable
ALTER TABLE "public"."Group" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Invoice" DROP COLUMN "arabicName",
DROP COLUMN "englishName",
DROP COLUMN "issueDate",
DROP COLUMN "paymentStatus",
DROP COLUMN "status",
DROP COLUMN "subtotal",
ADD COLUMN     "cutomer" TEXT NOT NULL,
ADD COLUMN     "invoiceStatus" "public"."InvoiceStatus" NOT NULL,
ADD COLUMN     "subTotal" DECIMAL(10,3) NOT NULL DEFAULT 0,
ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "firstName" DROP DEFAULT,
ALTER COLUMN "lastName" DROP DEFAULT,
ALTER COLUMN "mobileNumber" DROP DEFAULT,
ALTER COLUMN "defaultLanguage" SET DEFAULT 'EN';

-- DropTable
DROP TABLE "public"."Role";

-- DropTable
DROP TABLE "public"."_GroupToRole";

-- DropEnum
DROP TYPE "public"."PaymentStatus";
