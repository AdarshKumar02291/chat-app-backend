-- CreateTable
CREATE TABLE "Message" (
    "chatId" SERIAL NOT NULL,
    "senderId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("chatId")
);
