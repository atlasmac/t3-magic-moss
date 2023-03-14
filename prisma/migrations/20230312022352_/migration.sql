-- CreateTable
CREATE TABLE "DetailedReport" (
    "id" STRING NOT NULL,
    "siteId" STRING NOT NULL,
    "cfs" FLOAT8 NOT NULL,
    "condition" STRING NOT NULL,

    CONSTRAINT "DetailedReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiverConditions" (
    "id" STRING NOT NULL,
    "siteId" STRING NOT NULL,
    "cfs" FLOAT8 NOT NULL,
    "condition" STRING NOT NULL,

    CONSTRAINT "RiverConditions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DetailedReport_siteId_cfs_condition_key" ON "DetailedReport"("siteId", "cfs", "condition");

-- CreateIndex
CREATE UNIQUE INDEX "RiverConditions_siteId_cfs_condition_key" ON "RiverConditions"("siteId", "cfs", "condition");

-- AddForeignKey
ALTER TABLE "DetailedReport" ADD CONSTRAINT "DetailedReport_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Report"("siteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiverConditions" ADD CONSTRAINT "RiverConditions_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Report"("siteId") ON DELETE CASCADE ON UPDATE CASCADE;
