// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan"; // Import morgan for logging
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

import {
  LostErrorHandler,
  AppErrorHandler,
} from "./config/exceptionHandlers/handler.js"
import { corsOptions } from "./config/Cors/cors.js";
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);
app.all("*", function (req, res, next) {
  next();
});
app.use(LostErrorHandler);
app.use(AppErrorHandler);
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
