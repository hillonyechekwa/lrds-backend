-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_stylistId_fkey";

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "stylistId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_stylistId_fkey" FOREIGN KEY ("stylistId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
