/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `user-tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user-tag_userId_key" ON "user-tag"("userId");
