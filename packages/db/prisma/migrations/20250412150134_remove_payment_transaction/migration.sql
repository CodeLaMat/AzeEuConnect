/*
  Warnings:

  - You are about to drop the `PaymentTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStage" AS ENUM ('NONE', 'AWAITING_ADVANCE_PAYMENT', 'ADVANCE_PAID', 'AWAITING_FINAL_PAYMENT', 'FINAL_PAID');

-- CreateEnum
CREATE TYPE "InvoiceType" AS ENUM ('ADVANCE', 'FINAL');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('UNPAID', 'PAID', 'REFUNDED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "PaymentTransaction" DROP CONSTRAINT "PaymentTransaction_customerId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentTransaction" DROP CONSTRAINT "PaymentTransaction_orderId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentTransaction" DROP CONSTRAINT "PaymentTransaction_providerId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "advanceAmount" DOUBLE PRECISION,
ADD COLUMN     "finalAmount" DOUBLE PRECISION,
ADD COLUMN     "paymentStage" "PaymentStage" NOT NULL DEFAULT 'NONE';

-- DropTable
DROP TABLE "PaymentTransaction";

-- DropEnum
DROP TYPE "PayoutStatus";

-- DropEnum
DROP TYPE "TransactionStatus";

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "type" "InvoiceType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'UNPAID',
    "fileUrl" TEXT,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3),
    "stripePaymentIntentId" TEXT,
    "stripeCustomerId" TEXT,
    "paidById" TEXT,
    "paidToId" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_paidById_fkey" FOREIGN KEY ("paidById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_paidToId_fkey" FOREIGN KEY ("paidToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
