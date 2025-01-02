/*
  Warnings:

  - A unique constraint covering the columns `[stylistId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stylistId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('STYLING', 'CUT', 'TREATMENT');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "category" "ServiceCategory" NOT NULL DEFAULT 'STYLING',
ADD COLUMN     "stylistId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Service_stylistId_key" ON "Service"("stylistId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_stylistId_fkey" FOREIGN KEY ("stylistId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
