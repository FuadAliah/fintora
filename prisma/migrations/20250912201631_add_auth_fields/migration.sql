-- CreateEnum
CREATE TYPE "public"."CustomerType" AS ENUM ('personal', 'corporate', 'government');

-- CreateEnum
CREATE TYPE "public"."IdentificationType" AS ENUM ('passport', 'nationalID', 'driverLicense', 'CRN');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('admin', 'accountant', 'sales', 'viewer', 'user');

-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('en', 'ar');

-- CreateEnum
CREATE TYPE "public"."InvoiceStatus" AS ENUM ('draft', 'issued', 'canceled');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('paid', 'unpaid', 'partiallyPaid');

-- CreateEnum
CREATE TYPE "public"."InvoiceType" AS ENUM ('cash', 'creditCard', 'bankTransfer', 'other');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "image" TEXT,
    "role" "public"."UserRole" NOT NULL DEFAULT 'user',
    "passwordHash" TEXT NOT NULL,
    "tempPassword" TEXT,
    "forcePasswordChange" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "mobileNumber" TEXT NOT NULL DEFAULT '',
    "defaultLanguage" "public"."Language" NOT NULL DEFAULT 'en',
    "invoiceId" TEXT,
    "departmentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Invoice" (
    "id" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "type" "public"."InvoiceType" NOT NULL,
    "status" "public"."InvoiceStatus" NOT NULL,
    "paymentStatus" "public"."PaymentStatus" NOT NULL,
    "subtotal" DECIMAL(10,3) NOT NULL DEFAULT 0,
    "tax" DECIMAL(10,3) NOT NULL DEFAULT 0,
    "total" DECIMAL(10,3) NOT NULL DEFAULT 0,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_DATE + INTERVAL '7 days',
    "description" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "public"."Invoice"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "public"."Department"("name");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invoice" ADD CONSTRAINT "Invoice_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
