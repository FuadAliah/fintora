/*
  Warnings:

  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';

-- DropTable
DROP TABLE "public"."AuditLog";
