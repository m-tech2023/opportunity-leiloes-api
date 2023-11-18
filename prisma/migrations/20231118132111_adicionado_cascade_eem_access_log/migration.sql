-- DropForeignKey
ALTER TABLE "access_log" DROP CONSTRAINT "access_log_userId_fkey";

-- AddForeignKey
ALTER TABLE "access_log" ADD CONSTRAINT "access_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
