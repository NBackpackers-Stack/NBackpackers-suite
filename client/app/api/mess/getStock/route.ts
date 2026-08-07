import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import InventoryModel from "@/models/inventory.model";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // Check if an 'id' is provided in the query params
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (id) {
            // Find a specific stock inventory by ID
            const stock = await InventoryModel.findById(id);
            if (!stock) {
                return NextResponse.json(
                    { success: false, message: "Stock not found" },
                    { status: 404 }
                );
            }
            return NextResponse.json(
                { success: true, data: stock },
                { status: 200 }
            );
        }

        // Otherwise, fetch all stocks
        // const allStocks = await InventoryModel.find({});

        // return NextResponse.json(
        //     { success: true, data: allStocks },
        //     { status: 200 }
        // );

    } catch (error: any) {
        console.error("Error fetching stock:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
