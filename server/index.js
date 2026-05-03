import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "./auth.js";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Vite frontend
  credentials: true,
}));

// Route requests matching /api/auth to better-auth handler
app.use("/api/auth", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("QurbaniHat Backend API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
