import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const UserTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

export const ChatTable = pgTable("chat", {
  members: text("members")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  time: timestamp("timestamp1").notNull().defaultNow(),
});
