import {drizzle} from "drizzle-orm/neon-http";
import "dotenv/config";

// initializing db instance connection drizzle to db via connection string
export const db = drizzle(process.env.DATABASE_URL);