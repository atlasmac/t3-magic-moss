-- CreateTable
CREATE TABLE "RiverConditions" (
    "id" STRING NOT NULL,
    "siteId" STRING NOT NULL,
    "cfs" INT4 NOT NULL,
    "condition" STRING NOT NULL,

    CONSTRAINT "RiverConditions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RiverConditions_siteId_cfs_key" ON "RiverConditions"("siteId", "cfs");

-- AddForeignKey
ALTER TABLE "RiverConditions" ADD CONSTRAINT "RiverConditions_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Report"("siteId") ON DELETE CASCADE ON UPDATE CASCADE;
