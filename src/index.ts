import express from "express";
import "dotenv/config";
import { userRouter } from "./routes/user";

const cors = require("cors");

const app = express();
app.use("/*", cors());

app.get("/api", (req: any, res: any) => {
  res.send("hello from api");
});

app.use("/api/v1/user", userRouter);

// async function main() {

// //   const user = await db.insert(UserTable).values({
// //     name: "Adarsh",
// //   });

// const user = await db.query.UserTable.findFirst({
//     where: (UserTable, { eq }) => eq(UserTable.name, "Adarsh")
// });
// console.log(user );
// }
// main();

app.listen(3000);
