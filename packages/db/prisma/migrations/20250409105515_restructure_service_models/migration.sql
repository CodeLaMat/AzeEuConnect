/*
  Warnings:

  - You are about to drop the column `serviceType` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `serviceType` on the `ServiceListing` table. All the data in the column will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceTypeGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `serviceCategory` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('LEGAL_CONSULTATION', 'TAX_ADVISORY', 'BANKING_SETUP', 'COMPANY_FORMATION', 'FINANCIAL_PLANNING', 'MARKETING_SERVICES', 'CONSULTING_SERVICES', 'PROCUREMENT_SERVICES', 'MERGERS_AND_ACQUISITIONS', 'IT_SUPPORT', 'SOFTWARE_DEVELOPMENT', 'DESIGN_SERVICES', 'HUMAN_RESOURCES', 'RECRUITMENT', 'REAL_ESTATE_SERVICES', 'HOME_RENOVATION', 'REPAIR_SERVICES', 'HEALTHCARE_SERVICES', 'FITNESS_TRAINING', 'PERSONAL_COACHING', 'BEAUTY_SERVICES', 'LIFESTYLE_CONSULTING', 'PET_SERVICES', 'TRAVEL_PLANNING', 'EVENT_MANAGEMENT', 'ENTERTAINMENT_SERVICES', 'FOOD_CATERING', 'SECURITY_SERVICES', 'LEGAL_DOCUMENT_PREPARATION');

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_serviceTypeGroupId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "serviceType",
ADD COLUMN     "serviceCategory" "ServiceCategory" NOT NULL;

-- AlterTable
ALTER TABLE "ServiceListing" DROP COLUMN "serviceType";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "ServiceTypeGroup";

-- DropEnum
DROP TYPE "ServiceType";
