/*
  Warnings:

  - A unique constraint covering the columns `[siteId]` on the table `RiverConditions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RiverConditions_siteId_cfs_key";

-- CreateIndex
CREATE UNIQUE INDEX "RiverConditions_siteId_key" ON "RiverConditions"("siteId");
