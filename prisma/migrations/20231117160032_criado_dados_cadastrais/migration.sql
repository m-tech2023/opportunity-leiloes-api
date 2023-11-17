/*
  Warnings:

  - Made the column `userId` on table `access_log` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "access_log" DROP CONSTRAINT "access_log_userId_fkey";

-- AlterTable
ALTER TABLE "access_log" ALTER COLUMN "userId" SET NOT NULL;

-- CreateTable
CREATE TABLE "registration_data" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "nationality" TEXT,
    "marital_status" TEXT,
    "mother_name" TEXT,
    "father_name" TEXT,
    "occupation" TEXT,
    "company" TEXT,
    "company_website" TEXT,

    CONSTRAINT "registration_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registration_data_userId_key" ON "registration_data"("userId");

-- AddForeignKey
ALTER TABLE "registration_data" ADD CONSTRAINT "registration_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_log" ADD CONSTRAINT "access_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
