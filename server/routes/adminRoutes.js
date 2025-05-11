import express from "express"
import { adminLogin, adminLogout, dashboard } from "../controllers/adminController.js";
import { verifyUser } from "../middleware/verifyUser.js"

const router = express.Router();

// /api/admin
router.post("/login", adminLogin);
router.get("/dashboard", verifyUser, dashboard);
router.get("/logout", adminLogout);

export default router;