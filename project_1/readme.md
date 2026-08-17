
# setting up drizzle orm for postgresql db from neon db


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