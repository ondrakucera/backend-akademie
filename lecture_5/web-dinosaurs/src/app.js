import express from "express";
import { dinosaurRouter } from "./routes/dinosaurRoutes.js";

const app = express();

app.use(express.json());
app.use(dinosaurRouter);

export { app };
