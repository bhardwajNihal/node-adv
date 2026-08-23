import { uuid, pgTable, varchar, timestamp, text} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(), 
  updatedAt : timestamp('updated_at').$onUpdate(() => new Date())
});