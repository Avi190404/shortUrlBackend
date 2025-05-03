import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path : '.env.local'});

const ConnectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed", error);
    }
}

export default ConnectToDB;