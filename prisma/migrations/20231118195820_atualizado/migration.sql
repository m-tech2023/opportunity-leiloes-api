/*
  Warnings:

  - You are about to drop the column `role_id` on the `users_roles` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `users_roles` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `users_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `users_roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_user_id_fkey";

-- AlterTable
ALTER TABLE "users_roles" DROP COLUMN "role_id",
DROP COLUMN "user_id",
ADD COLUMN     "roleId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("roleName") ON DELETE RESTRICT ON UPDATE CASCADE;
