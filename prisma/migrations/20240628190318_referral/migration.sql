/*
  Warnings:

  - You are about to drop the column `nickname` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "nickname",
ADD COLUMN     "referralId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
