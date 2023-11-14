-- DropForeignKey
ALTER TABLE "access_log" DROP CONSTRAINT "access_log_user_id_fkey";

-- CreateTable
CREATE TABLE "UserAccessLog" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "fk_id_user" TEXT NOT NULL,
    "fk_id_access_log" TEXT NOT NULL,

    CONSTRAINT "UserAccessLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAccessLog" ADD CONSTRAINT "UserAccessLog_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccessLog" ADD CONSTRAINT "UserAccessLog_fk_id_access_log_fkey" FOREIGN KEY ("fk_id_access_log") REFERENCES "access_log"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
