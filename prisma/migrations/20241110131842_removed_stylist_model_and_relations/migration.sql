/*
  Warnings:

  - You are about to drop the column `stylistId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `stylistId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `Stylist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_stylistId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_stylistId_fkey";

-- DropForeignKey
ALTER TABLE "Stylist" DROP CONSTRAINT "Stylist_userId_fkey";

-- DropIndex
DROP INDEX "Booking_stylistId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "stylistId";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "stylistId";

-- DropTable
DROP TABLE "Stylist";
