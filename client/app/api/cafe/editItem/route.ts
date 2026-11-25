import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import MenuModel from "@/models/menu.model";
import { menuItems as defaultMenuItems } from "@/utils/menu";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PUT(req: NextRequest) {
    return handleEdit(req);
}

export async function POST(req: NextRequest) {
    return handleEdit(req);
}

async function handleEdit(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const {
            itemId,
            oldItemName,
            category,
            item,
            price,
            isAvailable,
            cafeName = "IDST Backpackers Cafe",
        } = body;

        if (!category || !item || !price) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category, item name, and price are required.",
                },
                { status: 400 }
            );
        }

        let menuDoc = await MenuModel.findOne({ cafeName });

        // Auto-seed with default menu if document does not exist yet
        if (!menuDoc) {
            const initialItems = defaultMenuItems.map((it) => ({
                category: it.category,
                item: it.item,
                price: it.price,
                isAvailable: true,
            }));

            menuDoc = await MenuModel.create({
                cafeName,
                items: initialItems,
            });
        }

        // Locate item by itemId or by oldItemName or item
        let targetIndex = -1;

        if (itemId) {
            targetIndex = menuDoc.items.findIndex((i: any) => String(i._id) === String(itemId));
        }

        if (targetIndex === -1 && oldItemName) {
            targetIndex = menuDoc.items.findIndex(
                (i: any) => i.item.toLowerCase() === String(oldItemName).trim().toLowerCase()
            );
        }

        if (targetIndex === -1 && item) {
            targetIndex = menuDoc.items.findIndex(
                (i: any) => i.item.toLowerCase() === String(item).trim().toLowerCase()
            );
        }

        if (targetIndex === -1) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Item to edit was not found in the menu.",
                },
                { status: 404 }
            );
        }

        // Update fields
        menuDoc.items[targetIndex].category = String(category).trim();
        menuDoc.items[targetIndex].item = String(item).trim();
        menuDoc.items[targetIndex].price = String(price).trim();
        if (isAvailable !== undefined) {
            menuDoc.items[targetIndex].isAvailable = Boolean(isAvailable);
        }

        // Crucial for Mongoose: mark items array as modified so change is persisted
        menuDoc.markModified("items");
        await menuDoc.save();

        return NextResponse.json(
            {
                success: true,
                message: `Item "${item}" updated successfully.`,
                data: menuDoc,
            },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate",
                    Pragma: "no-cache",
                    Expires: "0",
                },
            }
        );
    } catch (error: any) {
        console.error("Error updating menu item:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to update menu item.",
                error: error?.message || "Internal server error",
            },
            { status: 500 }
        );
    }
}
