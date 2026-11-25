import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import MenuModel from "@/models/menu.model";
import { menuItems as defaultMenuItems } from "@/utils/menu";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
            const initialItems = defaultMenuItems.map((it) => ({
                category: it.category,
                item: it.item,
                price: it.price,
                isAvailable: true,
            }));

            menuDoc = await MenuModel.create({
                cafeName,
                items: [
                    ...initialItems,
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
                {
                    status: 201,
                    headers: {
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                }
            );
        }

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

        menuDoc.markModified("items");
        await menuDoc.save();

        return NextResponse.json(
            {
                success: true,
                message: `Item "${trimmedItem}" added to menu successfully.`,
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
