/*
  Warnings:

  - You are about to drop the `UserAccessLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAccessLog" DROP CONSTRAINT "UserAccessLog_fk_id_access_log_fkey";

-- DropForeignKey
ALTER TABLE "UserAccessLog" DROP CONSTRAINT "UserAccessLog_fk_id_user_fkey";

-- DropTable
DROP TABLE "UserAccessLog";

-- CreateTable
CREATE TABLE "users_access_log" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "fk_id_user" TEXT NOT NULL,
    "fk_id_access_log" TEXT NOT NULL,

    CONSTRAINT "users_access_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_access_log" ADD CONSTRAINT "users_access_log_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_access_log" ADD CONSTRAINT "users_access_log_fk_id_access_log_fkey" FOREIGN KEY ("fk_id_access_log") REFERENCES "access_log"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
