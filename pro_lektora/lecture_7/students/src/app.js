import express from "express";
import { studentRouter } from "./routes/studentRoutes.js";

const app = express();

app.use(express.json());
app.use(studentRouter);

export { app };
