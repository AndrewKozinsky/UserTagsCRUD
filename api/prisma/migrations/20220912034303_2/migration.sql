-- CreateTable
CREATE TABLE "user-tag" (
    "id" SMALLSERIAL NOT NULL,
    "userIds" TEXT[],
    "tagIds" INTEGER[],

    CONSTRAINT "user-tag_pkey" PRIMARY KEY ("id")
);
