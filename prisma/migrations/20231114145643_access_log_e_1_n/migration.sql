/*
  Warnings:

  - You are about to drop the `users_access_log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_access_log" DROP CONSTRAINT "users_access_log_fk_id_access_log_fkey";

-- DropForeignKey
ALTER TABLE "users_access_log" DROP CONSTRAINT "users_access_log_fk_id_user_fkey";

-- DropTable
DROP TABLE "users_access_log";

-- AddForeignKey
ALTER TABLE "access_log" ADD CONSTRAINT "access_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
