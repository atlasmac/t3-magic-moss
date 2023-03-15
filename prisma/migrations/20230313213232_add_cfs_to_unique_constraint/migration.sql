/*
  Warnings:

  - A unique constraint covering the columns `[siteId,condition,cfs]` on the table `DetailedReport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siteId,condition,cfs]` on the table `RiverConditions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DetailedReport_siteId_condition_key";

-- DropIndex
DROP INDEX "RiverConditions_siteId_condition_key";

-- CreateIndex
CREATE UNIQUE INDEX "DetailedReport_siteId_condition_cfs_key" ON "DetailedReport"("siteId", "condition", "cfs");

-- CreateIndex
CREATE UNIQUE INDEX "RiverConditions_siteId_condition_cfs_key" ON "RiverConditions"("siteId", "condition", "cfs");
