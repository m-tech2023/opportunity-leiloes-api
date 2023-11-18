/*
  Warnings:

  - You are about to drop the column `created_at` on the `access_log` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `access_log` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `company_website` on the `registration_data` table. All the data in the column will be lost.
  - You are about to drop the column `father_name` on the `registration_data` table. All the data in the column will be lost.
  - You are about to drop the column `marital_status` on the `registration_data` table. All the data in the column will be lost.
  - You are about to drop the column `mother_name` on the `registration_data` table. All the data in the column will be lost.
  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role_name` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `farm_name` on the `stud_farm` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `stud_farm` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `stud_farm` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users_roles` table. All the data in the column will be lost.
  - Added the required column `roleName` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_role_id_fkey";

-- AlterTable
ALTER TABLE "access_log" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "address" DROP COLUMN "zip_code",
ADD COLUMN     "zipCode" TEXT;

-- AlterTable
ALTER TABLE "registration_data" DROP COLUMN "company_website",
DROP COLUMN "father_name",
DROP COLUMN "marital_status",
DROP COLUMN "mother_name",
ADD COLUMN     "companyWebsite" TEXT,
ADD COLUMN     "fatherName" TEXT,
ADD COLUMN     "maritalStatus" TEXT,
ADD COLUMN     "motherName" TEXT;

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "role_name",
ADD COLUMN     "roleName" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("roleName");

-- AlterTable
ALTER TABLE "stud_farm" DROP COLUMN "farm_name",
DROP COLUMN "updated_at",
DROP COLUMN "zip_code",
ADD COLUMN     "farmName" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "zipCode" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
DROP COLUMN "full_name",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fullName" VARCHAR(255) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users_roles" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("roleName") ON DELETE RESTRICT ON UPDATE CASCADE;
