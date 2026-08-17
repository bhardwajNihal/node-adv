import express from "express";
import {getAllAuthors} from "../controllers/author.js"

export const authorRouter = express.Router();


authorRouter.get("/", getAllAuthors);
