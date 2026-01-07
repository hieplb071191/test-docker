/*
  Warnings:

  - You are about to drop the column `isActive` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isConfirm` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `joinFromPlatform` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "isActive",
DROP COLUMN "isConfirm",
DROP COLUMN "joinFromPlatform",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_confirm" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "join_from_platform" "PlatformType" NOT NULL DEFAULT 'LOCAL_APP',
ALTER COLUMN "logout_at" DROP NOT NULL,
ALTER COLUMN "create_at" DROP NOT NULL,
ALTER COLUMN "update_at" DROP NOT NULL;
