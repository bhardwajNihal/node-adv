// defining authors schema

import {varchar, integer, uuid, pgTable} from 'drizzle-orm/pg-core'

export const authorsTable = pgTable("authors", ({

    id : uuid().primaryKey().defaultRandom(),
    name : varchar({length:255}).notNull(),
    email : varchar({length:255}).notNull().unique()
}))

