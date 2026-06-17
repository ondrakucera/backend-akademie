import express from "express";
import cors from "cors";
import { dinosaurRouter } from "./routes/dinosaurRoutes.js";
import { errorHandler } from "./validation/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(dinosaurRouter);
app.use(errorHandler());

export { app };
