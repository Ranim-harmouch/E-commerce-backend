import express from "express";
import { registerUser, getUserById } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/:id", getUserById);

export default router;