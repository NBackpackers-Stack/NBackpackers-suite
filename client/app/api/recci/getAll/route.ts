import RecciModel from "@/models/recci.model";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const resorts = await RecciModel.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: resorts });
    } catch (error) {
        console.error("API Error fetching RECCI resorts:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
