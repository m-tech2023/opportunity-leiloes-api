/*
  Warnings:

  - You are about to drop the column `document` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `document_name` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_document_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "document",
DROP COLUMN "document_name";

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "zip_code" TEXT,
    "address" TEXT,
    "number" TEXT,
    "neighborhood" TEXT,
    "city" TEXT,
    "state" TEXT,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "cellphone" TEXT,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stud_farm" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "address_id" TEXT,
    "contact_id" TEXT,
    "farm_name" TEXT,

    CONSTRAINT "stud_farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "cnpj" TEXT,
    "ie" TEXT,
    "cpf" TEXT,
    "rg" TEXT,
    "passport" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_user_id_key" ON "address"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_userId_key" ON "contacts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_telephone_key" ON "contacts"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_cellphone_key" ON "contacts"("cellphone");

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_user_id_key" ON "stud_farm"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_address_id_key" ON "stud_farm"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "stud_farm_contact_id_key" ON "stud_farm"("contact_id");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stud_farm" ADD CONSTRAINT "stud_farm_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stud_farm" ADD CONSTRAINT "stud_farm_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stud_farm" ADD CONSTRAINT "stud_farm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
