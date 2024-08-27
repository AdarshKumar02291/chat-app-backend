const express = require("express");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const messageRouter = express.Router(); // Correcting to use `Router`

messageRouter.use(express.json());

messageRouter.post("/create", async (req: any, res: any) => {
  const { chatId, senderId, text } = req.body;
  try {
    const message = await prisma.message.create({
      data: {
        chatId,
        senderId,
        text,
      },
    });
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
messageRouter.get("/get_message", async (req: any, res: any) => {
  const { chatId } = req.body;
  try {
    const message = await prisma.message.findFirst({
      where: {
        chatId,
      },
    });
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});