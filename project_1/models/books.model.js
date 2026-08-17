// defining books schema

import {varchar, integer, uuid, pgTable, text} from 'drizzle-orm/pg-core'
import { authorsTable } from './authors.model.js'

export const booksTable = pgTable("books", ({

    id : uuid().primaryKey().defaultRandom(),
    title : varchar({length:100}).notNull(),
    description : text().notNull().unique(),
    authorId : uuid().references( () => authorsTable.id).notNull()
}))

