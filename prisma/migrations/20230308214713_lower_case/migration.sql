/*
  Warnings:

  - You are about to drop the column `Lat` on the `LatLon` table. All the data in the column will be lost.
  - You are about to drop the column `Lon` on the `LatLon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lat,lon]` on the table `LatLon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lat` to the `LatLon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lon` to the `LatLon` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LatLon_Lat_Lon_key";

-- AlterTable
ALTER TABLE "LatLon" DROP COLUMN "Lat";
ALTER TABLE "LatLon" DROP COLUMN "Lon";
ALTER TABLE "LatLon" ADD COLUMN     "lat" FLOAT8 NOT NULL;
ALTER TABLE "LatLon" ADD COLUMN     "lon" FLOAT8 NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LatLon_lat_lon_key" ON "LatLon"("lat", "lon");
