-- CreateTable
CREATE TABLE "user" (
    "uid" UUID NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "nickname" VARCHAR(30) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "sortOrder" SMALLINT NOT NULL DEFAULT 0,
    "userId" UUID NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-tag" (
    "id" SMALLSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "tagIds" INTEGER[],

    CONSTRAINT "user-tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_uid_key" ON "user"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user-tag_userId_key" ON "user-tag"("userId");

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
