/*
  Warnings:

  - You are about to drop the column `fk_id_role` on the `users_roles` table. All the data in the column will be lost.
  - You are about to drop the column `fk_id_user` on the `users_roles` table. All the data in the column will be lost.
  - Added the required column `role_id` to the `users_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `users_roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_fk_id_role_fkey";

-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_fk_id_user_fkey";

-- AlterTable
ALTER TABLE "users_roles" DROP COLUMN "fk_id_role",
DROP COLUMN "fk_id_user",
ADD COLUMN     "role_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("role_name") ON DELETE RESTRICT ON UPDATE CASCADE;
