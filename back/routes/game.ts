import express from "express";
import { getGames } from "../controllers/game";

const router = express.Router();

router.post('/', getGames)

export default router;
