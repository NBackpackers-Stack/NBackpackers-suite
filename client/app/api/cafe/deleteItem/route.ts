import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import MenuModel from "@/models/menu.model";
import { menuItems as defaultMenuItems } from "@/utils/menu";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function DELETE(req: NextRequest) {
    return handleDelete(req);
}

export async function POST(req: NextRequest) {
    return handleDelete(req);
}

async function handleDelete(req: NextRequest) {
    try {
        await dbConnect();

        let itemId: string | null = null;
        let itemName: string | null = null;
        let cafeName = "IDST Backpackers Cafe";

        const { searchParams } = new URL(req.url);
        itemId = searchParams.get("itemId") || searchParams.get("id");
        itemName = searchParams.get("itemName") || searchParams.get("item");
        if (searchParams.get("cafeName")) {
            cafeName = searchParams.get("cafeName")!;
        }

        // Also check request body if query params are missing
        if (!itemId && !itemName) {
            try {
                const body = await req.json();
                itemId = body?.itemId || body?.id || null;
                itemName = body?.itemName || body?.item || null;
                if (body?.cafeName) cafeName = body.cafeName;
            } catch {
                // Body was empty, proceed with params
            }
        }

        if (!itemId && !itemName) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Either itemId or itemName is required to delete an item.",
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

        const initialLength = menuDoc.items.length;

        // Try deleting by itemId first
        if (itemId) {
            menuDoc.items = menuDoc.items.filter((i: any) => String(i._id) !== String(itemId));
        }

        // If not deleted by itemId and itemName is available, try deleting by itemName
        if (menuDoc.items.length === initialLength && itemName) {
            menuDoc.items = menuDoc.items.filter(
                (i: any) => i.item.toLowerCase() !== String(itemName).trim().toLowerCase()
            );
        }

        if (menuDoc.items.length === initialLength) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Item not found in menu to delete.",
                },
                { status: 404 }
            );
        }

        // Crucial for Mongoose: mark items array as modified
        menuDoc.markModified("items");
        await menuDoc.save();

        return NextResponse.json(
            {
                success: true,
                message: `Item deleted successfully. ${menuDoc.items.length} items remaining.`,
                count: menuDoc.items.length,
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
        console.error("Error deleting menu item:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete menu item.",
                error: error?.message || "Internal server error",
            },
            { status: 500 }
        );
    }
}
