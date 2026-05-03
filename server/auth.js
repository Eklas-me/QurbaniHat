import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import dotenv from "dotenv";
dotenv.config();

// Connect to MongoDB
const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/qurbanihat");

export const auth = betterAuth({
    database: mongodbAdapter(client.db(), {
        client,
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
    trustedOrigins: ["http://localhost:5173"],
    advanced: {
        crossSubDomainCookies: {
            enabled: true
        }
    }
});
