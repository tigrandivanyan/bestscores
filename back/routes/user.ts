import express from "express";
import { emailVerification, getUsers, loginUser, registerUser, updateUser } from "../controllers/user";

const router = express.Router();

router.post("/", registerUser)
router.post("/login", loginUser)
router.post("/verification", emailVerification)
router.post("/update", updateUser)
router.get("/", getUsers)

export default router;
