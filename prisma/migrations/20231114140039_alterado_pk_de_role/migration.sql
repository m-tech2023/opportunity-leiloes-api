/*
  Warnings:

  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `roles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_fk_id_role_fkey";

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("role_name");

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_fk_id_role_fkey" FOREIGN KEY ("fk_id_role") REFERENCES "roles"("role_name") ON DELETE RESTRICT ON UPDATE CASCADE;
