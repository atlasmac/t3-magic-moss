/*
  Warnings:

  - Added the required column `cfs` to the `DetailedReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cfs` to the `RiverConditions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetailedReport" ADD COLUMN     "cfs" INT4 NOT NULL;

-- AlterTable
ALTER TABLE "RiverConditions" ADD COLUMN     "cfs" INT4 NOT NULL;
