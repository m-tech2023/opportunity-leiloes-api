/*
  Warnings:

  - You are about to drop the column `addressId` on the `stud_farm` table. All the data in the column will be lost.
  - You are about to drop the column `contactId` on the `stud_farm` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `stud_farm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telephone]` on the table `stud_farm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cellphone]` on the table `stud_farm` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_userId_fkey";

-- DropForeignKey
ALTER TABLE "stud_farm" DROP CONSTRAINT "stud_farm_addressId_fkey";

-- DropForeignKey
ALTER TABLE "stud_farm" DROP CONSTRAINT "stud_farm_contactId_fkey";

-- DropIndex
DROP INDEX "stud_farm_addressId_key";

-- DropIndex
DROP INDEX "stud_farm_contactId_key";

-- AlterTable
ALTER TABLE "stud_farm" DROP COLUMN "addressId",
DROP COLUMN "contactId",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "cellphone" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "telephone" TEXT,
ADD COLUMN     "zip_code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_email_key" ON "stud_farm"("email");

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_telephone_key" ON "stud_farm"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_cellphone_key" ON "stud_farm"("cellphone");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
