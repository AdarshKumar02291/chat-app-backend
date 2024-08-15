const express = require("express");
import { db } from "../drizzle/db";
import { UserTable } from "../drizzle/schema";
export const userRouter = express();

userRouter.use(express.json());

userRouter.post("/signup", async (req: any, res: any) => {
  const { name, email } = req.body;
  const userExists = await db.query.UserTable.findFirst({
    where: (UserTable, { eq }) => eq(UserTable.email, email),
  });

  if (userExists) {
    return res
      .status(409)
      .send({ error: "User with this email already exists." });
  }
  const user = await db.insert(UserTable).values({
    name: name,
    email: email,
  });

  res.status(201).send({ msg: `${name} registered successfully.` });
});


userRouter.get("/users", async (req: any, res: any) => {
    try {
       const users = await db.select().from(UserTable);
  
      // Respond with the list of users
      res.status(200).send(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  });