/*
  Warnings:

  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users_roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `fk_id_user` on the `users_roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fk_id_role` on the `users_roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_fk_id_role_fkey";

-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_fk_id_user_fkey";

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "fk_id_user",
ADD COLUMN     "fk_id_user" INTEGER NOT NULL,
DROP COLUMN "fk_id_role",
ADD COLUMN     "fk_id_role" INTEGER NOT NULL,
ADD CONSTRAINT "users_roles_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_fk_id_role_fkey" FOREIGN KEY ("fk_id_role") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
