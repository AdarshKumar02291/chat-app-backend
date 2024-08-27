-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "members" TEXT[],
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);
