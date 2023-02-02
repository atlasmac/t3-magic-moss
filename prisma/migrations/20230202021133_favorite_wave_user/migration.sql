/*
  Warnings:

  - Made the column `userId` on table `FavoriteWave` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FavoriteWave" DROP CONSTRAINT "FavoriteWave_userId_fkey";

-- AlterTable
ALTER TABLE "FavoriteWave" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "FavoriteWave" ADD CONSTRAINT "FavoriteWave_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
