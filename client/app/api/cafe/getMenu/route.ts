import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import MenuModel from "@/models/menu.model";
import { menuItems as defaultMenuItems } from "@/utils/menu";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const cafeName = searchParams.get("cafeName") || "IDST Backpackers Cafe";

        let menuDoc = await MenuModel.findOne({ cafeName }).sort({ updatedAt: -1 });

        // Auto-initialize with default menu items if no menu document exists yet
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

        return NextResponse.json(
            {
                success: true,
                count: menuDoc.items.length,
                data: menuDoc,
            },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                    Pragma: "no-cache",
                    Expires: "0",
                },
            }
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
