const express = require("express");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const chatRouter = express.Router(); // Correcting to use `Router`

chatRouter.use(express.json());
chatRouter.post("/create_chat", async (req: any, res: any) => {
  // Added `async`
  const { firstId, secondId } = req.body;
  if (!firstId || !secondId) {
    return res
      .status(400)
      .json({ message: "Both firstId and secondId are required." });
  }

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        members: {
          hasEvery: [firstId, secondId], // Ensures both IDs are in the array
        },
      },
    });

    if (chat) {
      res.status(200).json(chat);
    }
    const newChat = await prisma.chat.create({
      data: {
        members: [firstId, secondId],
      },
    });
    res.status(200).json(newChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

chatRouter.get("/all_chat/:userId", async (req: any, res: any) => {
  const userId = req.params.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        members: {
          has: userId, // Checks if `userId` is in the `members` array
        },
      },
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

chatRouter.get("/find_chat/:firstId/:secondId", async (req: any, res: any) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await prisma.chat.findFirst({
      where: {
        members: {
          hasEvery: [firstId, secondId], // Ensures both IDs are in the array
        },
      },
    });

    if (chat) {
      res.status(200).json(chat);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
