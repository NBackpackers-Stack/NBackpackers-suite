import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import InventoryModel from "@/models/inventory.model";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const data = await req.json();
        // console.log("-----", data);


        if (!data || !data.messName || !data.items) {
            return NextResponse.json(
                { success: false, message: "Invalid data format. 'messName' and 'items' are required." },
                { status: 400 }
            );
        }

        // We use findOneAndUpdate with upsert to either update an existing document or create a new one
        // const updatedInventory = await InventoryModel.findOneAndUpdate(
        //     { messName: data.messName },
        //     {
        //         $set: {
        //             items: data.items
        //         }
        //     },
        //     { new: true, upsert: true }
        // );

        const createInventory = await InventoryModel.create(data);

        console.log("here is ", createInventory);


        return NextResponse.json(
            { success: true, message: "Inventory updated successfully", data: createInventory },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Error updating inventory:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
