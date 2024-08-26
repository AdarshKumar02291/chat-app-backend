const express = require("express");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const userRouter = express();

userRouter.use(express.json());

userRouter.post("/signup", async (req: any, res: any) => {
  const { username, password, firstName, lastName } = req.body;

  const resp = await prisma.user.create({
    data: {
      username,
      password,
      firstName,
      lastName,
    },
  });
  console.log(resp);

});
