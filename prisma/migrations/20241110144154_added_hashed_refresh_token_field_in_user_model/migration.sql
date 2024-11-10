/*
  Warnings:

  - A unique constraint covering the columns `[hashedRefreshToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedRefreshToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashedRefreshToken" TEXT NOT NULL,
ALTER COLUMN "username" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_hashedRefreshToken_key" ON "User"("hashedRefreshToken");
