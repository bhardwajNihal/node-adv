import { uuid, pgTable, varchar, timestamp, text, PgVarchar} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(), 
  updatedAt : timestamp('updated_at').$onUpdate(() => new Date())
});

export const urlsTable = pgTable("urls", {

  id: uuid().primaryKey().defaultRandom(),
  
  shortCode : varchar({length:100}).notNull().unique(),
  originalUrl : text().notNull(),
  userId : uuid().notNull().references(() => usersTable.id),

  createdAt: timestamp('created_at').defaultNow().notNull(), 
  updatedAt : timestamp('updated_at').$onUpdate(() => new Date())
  
})