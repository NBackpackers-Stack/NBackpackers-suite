import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);

        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB");

        if (error instanceof Error) {
            console.error(error.message);
        }

        process.exit(1);
    }
};

export default connectDB;