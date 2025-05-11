import express from "express"
import { getUserbyId, getUsers, updateUser } from "../controllers/userController.js"

const router = express.Router();

// /api/user

router.post("/getusers", getUsers);
router.get("/getuser/:userId", getUserbyId);
router.post("/update", updateUser);

export default router;