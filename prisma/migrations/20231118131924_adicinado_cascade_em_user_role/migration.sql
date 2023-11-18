-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_fk_id_user_fkey";

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
