/*
  Warnings:

  - A unique constraint covering the columns `[siteId,siteName,userId]` on the table `FavoriteWave` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "FavoriteWave_siteId_key";

-- DropIndex
DROP INDEX "FavoriteWave_siteName_key";

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteWave_siteId_siteName_userId_key" ON "FavoriteWave"("siteId", "siteName", "userId");
