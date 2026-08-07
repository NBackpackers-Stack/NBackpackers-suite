import TripModel from "@/models/trip.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        console.log("get_trip is hitting");
        await connectDB();

        const { id } = await params;
        console.log("id", id);
        const trip = await TripModel.findOne({ _id: id });
        console.log("trip from db", trip);

        return NextResponse.json({ success: true, trip });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}