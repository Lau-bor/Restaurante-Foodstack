import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {

        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {});

        console.log("MongoDB connected successfully :)");
        
        
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1)
    }
}

export default connectToMongoDB;