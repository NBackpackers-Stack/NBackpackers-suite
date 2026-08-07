import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import InventoryModel from "@/models/inventory.model";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();

        const { id } = await params;

        console.log("reacher here in item api", id);

        const { item_name, item_id, unit, quantity } = await req.json();

        console.log("item_name", item_name);
        console.log("item_id", item_id);
        console.log("unit", unit);
        console.log("quantity", quantity);

        const checkInventory = await InventoryModel.findById(id);
        if (!checkInventory) {
            return NextResponse.json(
                { success: false, message: "Inventory not found" },
                { status: 404 }
            );
        }

        const existItem = checkInventory.items.find((item: any) => item.name === item_name);
        if (existItem) {
            return NextResponse.json(
                { success: false, message: "Item already exists in inventory" },
                { status: 400 }
            );
        }

        checkInventory.items.push({
            item_name: item_name,
            item_id: item_id,
            unit: unit,
            current_stock: quantity
        });

        await checkInventory.save();

        return NextResponse.json(
            { success: true, message: "Item added successfully", data: checkInventory },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error adding item:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}