import express from "express";
import { addVehicle, deleteVehicle, getVehicle, updateFav } from "../controllers/vehicleController.js"

const router = express.Router();

// /api/vehicle

router.post("/add", addVehicle);
router.post("/get", getVehicle);
router.delete("/delete/:id", deleteVehicle);
router.put("/updateFav/:id", updateFav)

export default router;