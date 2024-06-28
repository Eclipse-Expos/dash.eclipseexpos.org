-- AlterTable
ALTER TABLE "User" ADD COLUMN     "referralId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
