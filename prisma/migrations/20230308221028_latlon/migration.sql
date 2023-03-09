/*
  Warnings:

  - You are about to drop the `ReportInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LatLon" DROP CONSTRAINT "LatLon_siteId_fkey";

-- DropForeignKey
ALTER TABLE "ReportInfo" DROP CONSTRAINT "ReportInfo_siteId_fkey";

-- DropTable
DROP TABLE "ReportInfo";

-- AddForeignKey
ALTER TABLE "LatLon" ADD CONSTRAINT "LatLon_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Report"("siteId") ON DELETE CASCADE ON UPDATE CASCADE;
