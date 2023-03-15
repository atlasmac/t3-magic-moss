/*
  Warnings:

  - You are about to drop the column `cfs` on the `DetailedReport` table. All the data in the column will be lost.
  - You are about to drop the column `cfs` on the `RiverConditions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[siteId,condition]` on the table `DetailedReport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siteId,condition]` on the table `RiverConditions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DetailedReport_siteId_cfs_condition_key";

-- DropIndex
DROP INDEX "RiverConditions_siteId_cfs_condition_key";

-- AlterTable
ALTER TABLE "DetailedReport" DROP COLUMN "cfs";

-- AlterTable
ALTER TABLE "RiverConditions" DROP COLUMN "cfs";

-- CreateIndex
CREATE UNIQUE INDEX "DetailedReport_siteId_condition_key" ON "DetailedReport"("siteId", "condition");

-- CreateIndex
CREATE UNIQUE INDEX "RiverConditions_siteId_condition_key" ON "RiverConditions"("siteId", "condition");
