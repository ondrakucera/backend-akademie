import express from "express";
import { dinosaurRepository } from "../repositories/dinosaurRepository.js";

import {
	dinosaurBodySchema,
	dinosaurIdParamSchema,
} from "../validation/dinosaurSchemas.js";

const router = express.Router();

router.get("/dinosaurs", async (request, response) => {
        const dinosaurs = await dinosaurRepository.listDinosaurs();
        response.json(dinosaurs);
    });

router.post("/dinosaurs", async (request, response) => {
        const dinosaur = dinosaurBodySchema.parse(request.body);
        const id = await dinosaurRepository.createDinosaur(dinosaur);
        response.status(201).json(id);  //TODO FJ tady bych raději vracel `{ id }` – number je sice také platný JSON, ale dost nástrojů si na tom vyláme zuby.
    });

router.get("/dinosaurs/:id", async (request, response) => {
        const { id } = dinosaurIdParamSchema.parse(request.params);
        const dinosaur = await dinosaurRepository.getDinosaurById(id);
        if (!dinosaur) {
            response.status(404).send();
            return;
        }
        response.json(dinosaur);
    });

router.put("/dinosaurs/:id", async (request, response) => {
        const { id } = dinosaurIdParamSchema.parse(request.params);
        const dinosaur = dinosaurBodySchema.parse(request.body);
        const updated = await dinosaurRepository.updateDinosaurById(id, dinosaur);
        if (!updated) {
            response.status(404).send();
            return;
        }
        response.status(204).send();
    });

router.delete("/dinosaurs/:id", async (request, response) => {
        const { id } = dinosaurIdParamSchema.parse(request.params);
        const deleted = await dinosaurRepository.deleteDinosaurById(id);
        if (!deleted) {
            response.status(404).send();
            return;
        }
        response.status(204).send();
    });

export const dinosaurRouter = router;
