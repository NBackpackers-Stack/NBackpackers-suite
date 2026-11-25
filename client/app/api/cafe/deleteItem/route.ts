import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import MenuModel from "@/models/menu.model";

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

        const menuDoc = await MenuModel.findOne({ cafeName });

        if (!menuDoc) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Menu for "${cafeName}" not found.`,
                },
                { status: 404 }
            );
        }

        const initialLength = menuDoc.items.length;

        if (itemId) {
            menuDoc.items = menuDoc.items.filter((i: any) => String(i._id) !== String(itemId));
        } else if (itemName) {
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

        await menuDoc.save();

        return NextResponse.json(
            {
                success: true,
                message: `Item deleted successfully. ${menuDoc.items.length} items remaining.`,
                count: menuDoc.items.length,
                data: menuDoc,
            },
            { status: 200 }
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
