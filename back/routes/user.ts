import express from "express";
import { downloadInstaller, emailVerification, getUsers, loginUser, registerUser, resetPassword, updateUser } from "../controllers/user";
import checkAuth from "../middleware/auth";

const router = express.Router();

router.post("/", registerUser)
router.post("/login", loginUser)
router.post("/reset", resetPassword)
router.post("/verification", emailVerification)
router.post("/update", checkAuth, updateUser)
router.get("/", checkAuth, getUsers)
router.get("/download", downloadInstaller)

export default router;
