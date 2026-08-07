import TripModel from "@/models/trip.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log("new_trip is hitting");
        await connectDB();

        const newTrip = await request.json();
        console.log("data from fronted", newTrip);


        const addTrip = new TripModel(newTrip);
        await addTrip.save();

        console.log("added to db", addTrip);

        return NextResponse.json({ success: true, message: "Trip created successfully" });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
