// defining books schema

import {varchar, uuid, pgTable, text, index} from 'drizzle-orm/pg-core'
import { authorsTable } from './authors.model.js'
import { sql } from 'drizzle-orm'

export const booksTable = pgTable("books", {

    id : uuid().primaryKey().defaultRandom(),
    title : varchar({length:100}).notNull(),
    description : text().notNull().unique(),
    authorId : uuid().references( () => authorsTable.id).notNull()
}, 
(table) => [        // adding indexing to table's title column for faster query
  index("title").on(table.title)
]
)

