/*
  Warnings:

  - You are about to drop the column `site` on the `Forecast` table. All the data in the column will be lost.
  - You are about to drop the column `site` on the `Observation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[siteId,date,cfs]` on the table `Forecast` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siteId,date,cfs]` on the table `Observation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `siteId` to the `Forecast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteId` to the `Observation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Forecast" DROP CONSTRAINT "Forecast_site_fkey";

-- DropForeignKey
ALTER TABLE "Observation" DROP CONSTRAINT "Observation_site_fkey";

-- DropIndex
DROP INDEX "Forecast_site_date_cfs_key";

-- DropIndex
DROP INDEX "Observation_site_date_cfs_key";

-- AlterTable
ALTER TABLE "Forecast" DROP COLUMN "site";
ALTER TABLE "Forecast" ADD COLUMN     "siteId" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Observation" DROP COLUMN "site";
ALTER TABLE "Observation" ADD COLUMN     "siteId" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Forecast_siteId_date_cfs_key" ON "Forecast"("siteId", "date", "cfs");

-- CreateIndex
CREATE UNIQUE INDEX "Observation_siteId_date_cfs_key" ON "Observation"("siteId", "date", "cfs");

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Report"("siteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forecast" ADD CONSTRAINT "Forecast_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Report"("siteId") ON DELETE CASCADE ON UPDATE CASCADE;
