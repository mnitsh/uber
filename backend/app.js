import dotenv from "dotenv"
dotenv.config({ path: ".env" });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes for user autentication
import userRoutes from "./routes/user.route.js";
app.use("/api/v1/users", userRoutes);

//routes for captain autentication
import captianRoutes from "./routes/captian.route.js";
app.use("/api/v1/captians", captianRoutes);

export { app };
