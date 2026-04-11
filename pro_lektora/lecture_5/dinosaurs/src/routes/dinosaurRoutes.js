import express from "express";
import { dinosaurController } from "../controllers/dinosaurController.js";

const router = express.Router();

router.get("/dinosaurs", dinosaurController.list);
router.post("/dinosaurs", dinosaurController.create);
router.get("/dinosaurs/:id", dinosaurController.getById);
router.put("/dinosaurs/:id", dinosaurController.updateById);
router.delete("/dinosaurs/:id", dinosaurController.deleteById);

export const dinosaurRouter = router;
