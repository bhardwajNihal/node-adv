

# a basic backend for a book store app



- setting up drizzle orm for postgresql db from neon db


-
- install : 
  "dependencies": {
    "@neondatabase/serverless", 
    "dotenv",
    "drizzle-orm",
    "express"
  },
  "devDependencies": {
    "drizzle-kit":
  }


- create folders: 
    - drizzle
    - src
        - db
            - index.js
        - server.js
    - models
        - author.model.js --> for author table
        - book.model.js --> for books Table


- initializze db instance from the connection string, in the db/index.js file

- define db schemas for books and author in the model folder

- configure the drizzle.config.js file
    import 'dotenv/config';
    import { defineConfig } from 'drizzle-kit';
    export default defineConfig({
    out: './drizzle',
    schema: './models/index.js',            // modify it according to the folder structure
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    });


- finally --> npx drizzle-kit push
    - to add the tables to the remote db

- controllers and routes for books and author related cruds
    - added keyword based search while querying book

    - for faster, more efficient query based on search , added indexing to the books table
    - 1. add index to the books table schema
    - 2. made changes to the getBooks controller, added index based query