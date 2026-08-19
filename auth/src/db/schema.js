

// here contains all the db models

import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";



export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password : text().notNull()
});


// creating a table to store user sessions
// new entry in the sessions table is created, everytime the user logs in
// then the sessionId is returned
export const sessionsTable = pgTable("user-sessions", {
    id : uuid().primaryKey().defaultRandom(),
    userId : uuid().references(() => usersTable.id).notNull(),
    createdAt : timestamp().defaultNow().notNull()
})