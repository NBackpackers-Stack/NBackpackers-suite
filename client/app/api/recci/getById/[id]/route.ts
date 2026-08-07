import RecciModel from "@/models/recci.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
        }

        const resort = await RecciModel.findById(id);

        if (!resort) {
            return NextResponse.json({ success: false, message: "Resort not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: resort });
    } catch (error) {
        console.error("API Error fetching specific RECCI:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
