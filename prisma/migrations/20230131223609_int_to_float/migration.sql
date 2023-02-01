/*
  Warnings:

  - Changed the type of `cfs` on the `Forecast` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ft` on the `Forecast` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cfs` on the `Observation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ft` on the `Observation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Forecast" DROP COLUMN "cfs";
ALTER TABLE "Forecast" ADD COLUMN     "cfs" FLOAT8 NOT NULL;
ALTER TABLE "Forecast" DROP COLUMN "ft";
ALTER TABLE "Forecast" ADD COLUMN     "ft" FLOAT8 NOT NULL;

-- AlterTable
ALTER TABLE "Observation" DROP COLUMN "cfs";
ALTER TABLE "Observation" ADD COLUMN     "cfs" FLOAT8 NOT NULL;
ALTER TABLE "Observation" DROP COLUMN "ft";
ALTER TABLE "Observation" ADD COLUMN     "ft" FLOAT8 NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Forecast_siteId_date_cfs_key" ON "Forecast"("siteId", "date", "cfs");

-- CreateIndex
CREATE UNIQUE INDEX "Observation_siteId_date_cfs_key" ON "Observation"("siteId", "date", "cfs");
