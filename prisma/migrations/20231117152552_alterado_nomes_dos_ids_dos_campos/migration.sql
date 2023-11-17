/*
  Warnings:

  - You are about to drop the column `user_id` on the `access_log` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `address_id` on the `stud_farm` table. All the data in the column will be lost.
  - You are about to drop the column `contact_id` on the `stud_farm` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `stud_farm` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `access_log` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `documents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `stud_farm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `stud_farm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactId]` on the table `stud_farm` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "access_log" DROP CONSTRAINT "access_log_user_id_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_user_id_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "stud_farm" DROP CONSTRAINT "stud_farm_address_id_fkey";

-- DropForeignKey
ALTER TABLE "stud_farm" DROP CONSTRAINT "stud_farm_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "stud_farm" DROP CONSTRAINT "stud_farm_user_id_fkey";

-- DropIndex
DROP INDEX "address_user_id_key";

-- DropIndex
DROP INDEX "contacts_user_id_key";

-- DropIndex
DROP INDEX "stud_farm_address_id_key";

-- DropIndex
DROP INDEX "stud_farm_contact_id_key";

-- DropIndex
DROP INDEX "stud_farm_user_id_key";

-- AlterTable
ALTER TABLE "access_log" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "address" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "stud_farm" DROP COLUMN "address_id",
DROP COLUMN "contact_id",
DROP COLUMN "user_id",
ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "contactId" TEXT,
ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "access_log_userId_key" ON "access_log"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_key" ON "address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_userId_key" ON "contacts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "documents_userId_key" ON "documents"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_userId_key" ON "stud_farm"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_addressId_key" ON "stud_farm"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_contactId_key" ON "stud_farm"("contactId");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stud_farm" ADD CONSTRAINT "stud_farm_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stud_farm" ADD CONSTRAINT "stud_farm_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stud_farm" ADD CONSTRAINT "stud_farm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_log" ADD CONSTRAINT "access_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
