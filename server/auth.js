import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import dotenv from "dotenv";
dotenv.config();

// Create a single client instance
let client;

const getClient = () => {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/qurbanihat");
    }
    return client;
};

export const auth = betterAuth({
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
    // IMPORTANT: Make sure this exactly matches your production URL
    trustedOrigins: ["http://localhost:5173", "https://qurbanirhat.vercel.app"],
    advanced: {
        crossSubDomainCookies: {
            enabled: true
        }
    }
});
