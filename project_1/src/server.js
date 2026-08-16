

import dotenv from 'dotenv';
dotenv.config();
import {drizzle} from 'drizzle-orm/neon-http'

// initializing db connection, using connection string

const db = drizzle(process.env.DATABASE_URL);

async () => {
    
    await db.connect()
}