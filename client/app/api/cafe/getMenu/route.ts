import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import MenuModel from "@/models/menu.model";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const cafeName = searchParams.get("cafeName") || "IDST Backpackers Cafe";

        const menuDoc = await MenuModel.findOne({ cafeName }).sort({ updatedAt: -1 });

        if (!menuDoc) {
            return NextResponse.json(
                {
                    success: false,
                    message: `No menu found for '${cafeName}'.`,
                    data: null,
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: menuDoc,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching menu:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch menu from database.",
                error: error?.message || "Internal server error",
            },
            { status: 500 }
        );
    }
}
