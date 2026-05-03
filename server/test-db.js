import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

async function testConnection() {
    const uri = process.env.MONGODB_URI;
    console.log("Connecting to:", uri);
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ Successfully connected to MongoDB!");
        const databases = await client.db().admin().listDatabases();
        console.log("Databases:", databases.databases.map(db => db.name));
    } catch (e) {
        console.error("❌ Connection failed:", e.message);
    } finally {
        await client.close();
    }
}

testConnection();
