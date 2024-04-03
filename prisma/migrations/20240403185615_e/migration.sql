/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LoginResult" AS ENUM ('SUCCESS', 'INVALID_PASSWORD', 'USER_NOT_FOUND', 'TOO_MANY_ATTEMPTS');

-- DropForeignKey
ALTER TABLE "MailingList" DROP CONSTRAINT "MailingList_userId_fkey";

-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ALTER COLUMN "firstName" SET DEFAULT '',
ALTER COLUMN "lastName" SET DEFAULT '';

-- CreateTable
CREATE TABLE "HiringApplication" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "institution" TEXT NOT NULL,
    "resumePath" TEXT NOT NULL,
    "resumeName" TEXT NOT NULL,
    "portfolioPath" TEXT,
    "portfolioName" TEXT,
    "aboutAnswer" TEXT NOT NULL,
    "recordAnswer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HiringApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPermission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "canAccessDashboard" BOOLEAN NOT NULL DEFAULT true,
    "canAccessAdmin" BOOLEAN NOT NULL DEFAULT false,
    "canManageUsers" BOOLEAN NOT NULL DEFAULT false,
    "canManageMailingList" BOOLEAN NOT NULL DEFAULT false,
    "canManageHiringApplications" BOOLEAN NOT NULL DEFAULT false,
    "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginAttempt" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "result" "LoginResult" NOT NULL,
    "associatedUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPermission_userId_key" ON "UserPermission"("userId");

-- AddForeignKey
ALTER TABLE "MailingList" ADD CONSTRAINT "MailingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LoginAttempt" ADD CONSTRAINT "LoginAttempt_associatedUserId_fkey" FOREIGN KEY ("associatedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
