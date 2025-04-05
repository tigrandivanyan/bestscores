import express from "express";
import { getGames } from "../controllers/game";
import checkAuth from "../middleware/auth";

const router = express.Router();

router.post('/', checkAuth, getGames)

export default router;
