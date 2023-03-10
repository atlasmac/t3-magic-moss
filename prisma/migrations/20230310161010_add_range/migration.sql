/*
  Warnings:

  - You are about to drop the column `range` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "range";

-- CreateTable
CREATE TABLE "Range" (
    "bottomRange" INT4 NOT NULL,
    "topRange" INT4 NOT NULL,
    "siteId" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Range_siteId_key" ON "Range"("siteId");

-- AddForeignKey
ALTER TABLE "Range" ADD CONSTRAINT "Range_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Report"("siteId") ON DELETE CASCADE ON UPDATE CASCADE;
