import express from "express";
import { getGames, postGames } from "../controllers/game";
import checkAuth from "../middleware/auth";

const router = express.Router();

router.post('/', checkAuth, postGames)
router.get("/", checkAuth, getGames)

export default router;
