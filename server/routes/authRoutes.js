import express from "express";
const router = express.Router();

import { userRegister, verifyEmail, userLogin, googleAuth } from "../controllers/authController.js";


// /api/auth

router.post("/register", userRegister);
router.get("/verify", verifyEmail);

router.post("/login", userLogin);
router.post("/googleauth", googleAuth);

export default router;