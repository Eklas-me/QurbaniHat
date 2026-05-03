import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "../server/auth.js";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://qurbanirhat.vercel.app"],
  credentials: true,
}));

// Better-auth handler
app.use("/api/auth", toNodeHandler(auth));

app.get("/api", (req, res) => {
  res.send("QurbaniHat Backend API is running on Vercel Functions");
});

// For Vercel, we export the app instead of calling app.listen()
export default app;
