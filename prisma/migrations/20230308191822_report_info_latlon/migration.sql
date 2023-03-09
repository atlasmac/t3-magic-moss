-- CreateTable
CREATE TABLE "ReportInfo" (
    "siteId" STRING NOT NULL,
    "location" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "LatLon" (
    "Lat" FLOAT8 NOT NULL,
    "Lon" FLOAT8 NOT NULL,
    "siteId" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ReportInfo_siteId_key" ON "ReportInfo"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "LatLon_siteId_key" ON "LatLon"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "LatLon_Lat_Lon_key" ON "LatLon"("Lat", "Lon");

-- AddForeignKey
ALTER TABLE "ReportInfo" ADD CONSTRAINT "ReportInfo_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Report"("siteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LatLon" ADD CONSTRAINT "LatLon_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "ReportInfo"("siteId") ON DELETE CASCADE ON UPDATE CASCADE;
