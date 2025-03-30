/*
  Warnings:

  - Added the required column `displayName` to the `RolePermission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RolePermission" ADD COLUMN     "displayName" TEXT NOT NULL;
