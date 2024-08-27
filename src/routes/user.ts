const express = require("express");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const userRouter = express();

userRouter.use(express.json());

userRouter.post("/signup", async (req: any, res: any) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (findUser) {
      return res.status(409).json({ msg: "user already exists" });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    });

    return res.status(201).json({
      msg: "User signed up",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Verify the password
    const isPasswordValid = ()=>{
      return password === user.password
    }
    if (!isPasswordValid()) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate a JWT token without an expiration time
    // const token = jwt.sign({ userId: user.id }, "your-secret-key");

    return res.status(200).json({
      msg: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
