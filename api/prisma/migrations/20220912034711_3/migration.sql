/*
  Warnings:

  - You are about to drop the column `userIds` on the `user-tag` table. All the data in the column will be lost.
  - Added the required column `userId` to the `user-tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user-tag" DROP COLUMN "userIds",
ADD COLUMN     "userId" TEXT NOT NULL;
