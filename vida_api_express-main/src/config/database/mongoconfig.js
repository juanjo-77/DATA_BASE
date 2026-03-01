import mongoose from "mongoose";
import { env } from "../env.js"

export const connectMongo = async () => {
    try {
        await mongoose.connect(env.MONGO.URI);
        console.log("Mongo esta conectado");
    } catch (error) {
        console.error(error);
        process.exit(1)
    }

}

export const poolMongo = mongoose.connect(env.MONGO.URI)