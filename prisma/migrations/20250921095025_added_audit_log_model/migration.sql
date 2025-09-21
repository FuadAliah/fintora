-- AlterTable
ALTER TABLE "public"."AuditLog" ADD COLUMN     "ip" TEXT,
ADD COLUMN     "userAgent" TEXT,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "tableName" DROP NOT NULL,
ALTER COLUMN "recordId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "dueDate" SET DEFAULT CURRENT_DATE + INTERVAL '7 days';
