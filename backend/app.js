import dotenv from "dotenv"
dotenv.config({ path: ".env" });

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes for user autentication
import userRoutes from "./routes/user.route.js";
app.use("/api/v1/user", userRoutes);

export { app };
