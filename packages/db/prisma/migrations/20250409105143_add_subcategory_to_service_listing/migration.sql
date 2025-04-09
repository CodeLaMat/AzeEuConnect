/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subCategory` to the `ServiceListing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "serviceSubType" TEXT;

-- AlterTable
ALTER TABLE "ServiceListing" ADD COLUMN     "image" TEXT,
ADD COLUMN     "subCategory" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ServicePackage" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "Session";
