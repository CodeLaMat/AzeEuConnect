/*
  Warnings:

  - The values [TECH_SUPPORT] on the enum `ServiceType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR', 'USD', 'TRY', 'AZN');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('AUTHORIZED', 'CAPTURED', 'REFUNDED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('MARKETPLACE', 'CUSTOM_JOB');

-- AlterEnum
BEGIN;
CREATE TYPE "ServiceType_new" AS ENUM ('LEGAL_CONSULTATION', 'TAX_ADVISORY', 'BANKING_SETUP', 'COMPANY_FORMATION', 'FINANCIAL_PLANNING', 'MARKETING_SERVICES', 'CONSULTING_SERVICES', 'PROCUREMENT_SERVICES', 'MERGERS_AND_ACQUISITIONS', 'IT_SUPPORT', 'SOFTWARE_DEVELOPMENT', 'DESIGN_SERVICES', 'HUMAN_RESOURCES', 'RECRUITMENT', 'REAL_ESTATE_SERVICES', 'HOME_RENOVATION', 'REPAIR_SERVICES', 'HEALTHCARE_SERVICES', 'FITNESS_TRAINING', 'PERSONAL_COACHING', 'BEAUTY_SERVICES', 'LIFESTYLE_CONSULTING', 'PET_SERVICES', 'TRAVEL_PLANNING', 'EVENT_MANAGEMENT', 'ENTERTAINMENT_SERVICES', 'FOOD_CATERING', 'SECURITY_SERVICES', 'LEGAL_DOCUMENT_PREPARATION');
ALTER TABLE "Appointment" ALTER COLUMN "serviceType" TYPE "ServiceType_new" USING ("serviceType"::text::"ServiceType_new");
ALTER TABLE "ServiceListing" ALTER COLUMN "serviceType" TYPE "ServiceType_new" USING ("serviceType"::text::"ServiceType_new");
ALTER TYPE "ServiceType" RENAME TO "ServiceType_old";
ALTER TYPE "ServiceType_new" RENAME TO "ServiceType";
DROP TYPE "ServiceType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "customNotes" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deliveryDue" TIMESTAMP(3),
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "providerId" TEXT,
ADD COLUMN     "stripePaymentIntentId" TEXT,
ADD COLUMN     "type" "OrderType" NOT NULL DEFAULT 'MARKETPLACE',
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ServiceListing" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'EUR',
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ServicePackage" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "currentRole" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- CreateTable
CREATE TABLE "PaymentTransaction" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "customerId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payoutStatus" "PayoutStatus" NOT NULL,

    CONSTRAINT "PaymentTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Appointment_userId_idx" ON "Appointment"("userId");

-- CreateIndex
CREATE INDEX "Document_userId_idx" ON "Document"("userId");

-- CreateIndex
CREATE INDEX "ServiceListing_ownerId_idx" ON "ServiceListing"("ownerId");

-- CreateIndex
CREATE INDEX "ServiceSubscription_subscriberId_idx" ON "ServiceSubscription"("subscriberId");

-- CreateIndex
CREATE INDEX "ServiceSubscription_serviceId_idx" ON "ServiceSubscription"("serviceId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
