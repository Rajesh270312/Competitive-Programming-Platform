/*
  Warnings:

  - You are about to drop the column `userId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Syllabus` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Syllabus` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Syllabus" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Payment";
