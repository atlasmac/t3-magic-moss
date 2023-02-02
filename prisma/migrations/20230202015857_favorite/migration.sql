-- CreateTable
CREATE TABLE "FavoriteWave" (
    "siteId" STRING NOT NULL,
    "siteName" STRING NOT NULL,
    "userId" STRING
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteWave_siteId_key" ON "FavoriteWave"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteWave_siteName_key" ON "FavoriteWave"("siteName");

-- AddForeignKey
ALTER TABLE "FavoriteWave" ADD CONSTRAINT "FavoriteWave_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
