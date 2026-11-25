import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import MenuModel from "@/models/menu.model";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();

        // Support both direct array of items or { cafeName, items }
        let items: any[] = [];
        let cafeName = "IDST Backpackers Cafe";

        if (Array.isArray(body)) {
            items = body;
        } else if (body && Array.isArray(body.items)) {
            items = body.items;
            if (body.cafeName) {
                cafeName = body.cafeName;
            }
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid data format. Expected an array of menu objects or { items: [...] }.",
                },
                { status: 400 }
            );
        }

        if (items.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Menu items array cannot be empty.",
                },
                { status: 400 }
            );
        }

        // Validate each item structure
        for (let i = 0; i < items.length; i++) {
            const it = items[i];
            if (!it || typeof it !== "object") {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Item at index ${i} is not a valid object.`,
                    },
                    { status: 400 }
                );
            }

            const category = it.category || it.Category;
            const item = it.item || it.Item || it.name || it.itemName;
            const price = it.price || it.Price;

            if (!category || !item || !price) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Item at index ${i} is missing required fields (category, item, price).`,
                    },
                    { status: 400 }
                );
            }
        }

        const sanitizedItems = items.map((it: any) => ({
            category: String(it.category || it.Category).trim(),
            item: String(it.item || it.Item || it.name || it.itemName).trim(),
            price: String(it.price || it.Price).trim(),
            isAvailable: it.isAvailable !== undefined ? Boolean(it.isAvailable) : true,
        }));

        // Upsert the menu document for this cafe
        const updatedMenu = await MenuModel.findOneAndUpdate(
            { cafeName },
            {
                $set: {
                    items: sanitizedItems,
                },
            },
            { new: true, upsert: true }
        );

        return NextResponse.json(
            {
                success: true,
                message: `Menu for '${cafeName}' saved successfully with ${sanitizedItems.length} items.`,
                count: sanitizedItems.length,
                data: updatedMenu,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error creating/updating menu:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to save menu to database.",
                error: error?.message || "Internal server error",
            },
            { status: 500 }
        );
    }
}

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
