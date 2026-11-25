import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import MenuModel from "@/models/menu.model";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const { category, item, price, isAvailable = true, cafeName = "IDST Backpackers Cafe" } = body;

        if (!category || !item || !price) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category, item name, and price are required.",
                },
                { status: 400 }
            );
        }

        const trimmedCategory = String(category).trim();
        const trimmedItem = String(item).trim();
        const trimmedPrice = String(price).trim();

        let menuDoc = await MenuModel.findOne({ cafeName });

        if (!menuDoc) {
            // If no menu exists, create the initial menu with this item
            menuDoc = await MenuModel.create({
                cafeName,
                items: [
                    {
                        category: trimmedCategory,
                        item: trimmedItem,
                        price: trimmedPrice,
                        isAvailable: Boolean(isAvailable),
                    },
                ],
            });

            return NextResponse.json(
                {
                    success: true,
                    message: `Item "${trimmedItem}" added successfully.`,
                    data: menuDoc,
                },
                { status: 201 }
            );
        }

        // Check if item with exact same name already exists in menu
        const existingItemIndex = menuDoc.items.findIndex(
            (i: any) => i.item.toLowerCase() === trimmedItem.toLowerCase()
        );

        if (existingItemIndex !== -1) {
            return NextResponse.json(
                {
                    success: false,
                    message: `An item named "${trimmedItem}" already exists in the menu.`,
                },
                { status: 400 }
            );
        }

        menuDoc.items.push({
            category: trimmedCategory,
            item: trimmedItem,
            price: trimmedPrice,
            isAvailable: Boolean(isAvailable),
        });

        await menuDoc.save();

        return NextResponse.json(
            {
                success: true,
                message: `Item "${trimmedItem}" added to menu successfully.`,
                data: menuDoc,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error adding menu item:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to add item to menu.",
                error: error?.message || "Internal server error",
            },
            { status: 500 }
        );
    }
}
