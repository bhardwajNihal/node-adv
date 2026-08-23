hello
# url shortnener project

- initialize an empty node project --> pnpm init
- install express
- configure drizzle
- write db schemas
- migrate to remote db(neon)
- routes and controllers


------------------------------------------------ readme from instructor
# 📋 Project Requirements - URL Shortener API

This document lists all the tools, technologies, and libraries used in the URL Shortener project. Ensure you have everything set up before beginning development.

---

## 🧱 Tech Stack Overview

| Category         | Technology        | Purpose                               |
| ---------------- | ----------------- | ------------------------------------- |
| Backend          | Node.js + Express | REST API development                  |
| Database         | PostgreSQL        | Relational data store                 |
| ORM              | Drizzle ORM       | Type-safe database queries and schema |
| Authentication   | JWT               | Securing private routes               |
| Testing Tool     | Postman           | Manual API testing                    |

---

## 📦 NPM Dependencies

Run this to install all required packages:

```bash
npm install express drizzle-orm pg jsonwebtoken bcrypt dotenv
```

## Auth Routes

| Method | Endpoint  | Description             | Auth Required |
| ------ | --------- | ----------------------- | ------------- |
| POST   | `/signup` | Register a new user     | ❌            |
| POST   | `/login`  | Login and receive token | ❌            |

## URL Routes

| Method | Endpoint      | Description                                | Auth Required |
| ------ | ------------- | ------------------------------------------ | ------------- |
| POST   | `/shorten`    | Create a short URL from a long one         | ✅            |
| GET    | `/:shortCode` | Redirect to the original URL               | ❌            |
| GET    | `/urls`       | Get all URLs created by the logged-in user | ✅            |
| DELETE | `/urls/:id`   | Delete a short URL (if it belongs to user) | ✅            |
