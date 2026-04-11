import express from "express";
import { createErrorMiddleware } from "./middleware/errorMiddleware.js";
import { dinosaurRouter } from "./routes/dinosaurRoutes.js";

const app = express();

app.use(express.json());
app.use(dinosaurRouter);
app.use(createErrorMiddleware());

export { app };
