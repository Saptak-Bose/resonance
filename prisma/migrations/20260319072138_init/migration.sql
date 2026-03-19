/*
  Warnings:

  - You are about to drop the column `r2ObjectKey` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `r2ObjectKey` on the `Voice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Generation" DROP COLUMN "r2ObjectKey",
ADD COLUMN     "b2ObjectKey" TEXT;

-- AlterTable
ALTER TABLE "Voice" DROP COLUMN "r2ObjectKey",
ADD COLUMN     "b2ObjectKey" TEXT;
