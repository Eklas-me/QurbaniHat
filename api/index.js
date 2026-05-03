import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://qurbanirhat.vercel.app"],
  credentials: true,
}));

// MongoDB Connection
let client;
const getClient = () => {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI);
    }
    return client;
};

const auth = betterAuth({
    database: mongodbAdapter(getClient().db(), {
        client: getClient(),
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }
    },
    trustedOrigins: ["http://localhost:5173", "https://qurbanirhat.vercel.app"],
});

// Better-auth handler
app.use("/api/auth", toNodeHandler(auth));

app.get("/api", (req, res) => {
  res.send("QurbaniHat Backend API is running on Vercel");
});

export default app;
