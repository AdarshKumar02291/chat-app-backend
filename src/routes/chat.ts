const express = require("express");
import { db } from "../drizzle/db";
import { ChatTable } from "../drizzle/schema";
export const chatRouter = express();


chatRouter.use(express.json());

const createChat =  async(req: any,res: any)=>{
    const {firstId,secondId} = req.body

    try{
        const chat = await db.insert(ChatTable).values({
            members: ['Alice', 'Bob'],
          });

    }catch(error){
        console.log(error)
        res.status(500)
    }
}