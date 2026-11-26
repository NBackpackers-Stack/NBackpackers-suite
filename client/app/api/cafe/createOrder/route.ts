import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import OrderModel, { IOrderItem } from "@/models/order.model";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
    "Cache-Control": "no-store, no-cache, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
};

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const {
            cafeName = "IDST Backpackers Cafe",
            customerName,
            customerNumber,
            notes = "",
            items,
            totalPrice,
            totalUnits,
        } = body || {};

        const trimmedCustomerName = typeof customerName === "string" ? customerName.trim() : "";
        const trimmedCustomerNumber = typeof customerNumber === "string" ? customerNumber.trim() : "";

        if (!trimmedCustomerName) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Customer name is required.",
                },
                { status: 400 }
            );
        }

        if (!trimmedCustomerNumber || trimmedCustomerNumber.length < 10) {
            return NextResponse.json(
                {
                    success: false,
                    message: "A valid 10-digit customer mobile number is required.",
                },
                { status: 400 }
            );
        }

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Order must contain at least one item.",
                },
                { status: 400 }
            );
        }

        const sanitizedItems: IOrderItem[] = [];
        for (let i = 0; i < items.length; i++) {
            const it = items[i];
            if (!it || typeof it !== "object") {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Order item at index ${i} is invalid.`,
                    },
                    { status: 400 }
                );
            }

            const itemName = String(it.itemName || it.name || "").trim();
            const category = String(it.category || "").trim();
            const price = Number(it.price);
            const quantity = Number(it.quantity);

            if (!itemName || !category) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Order item at index ${i} is missing itemName or category.`,
                    },
                    { status: 400 }
                );
            }

            if (Number.isNaN(price) || price < 0) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Invalid price for item "${itemName}".`,
                    },
                    { status: 400 }
                );
            }

            if (Number.isNaN(quantity) || quantity < 1) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Invalid quantity for item "${itemName}".`,
                    },
                    { status: 400 }
                );
            }

            const rawSubtotal = Number(it.subtotal);
            const subtotal =
                !Number.isNaN(rawSubtotal) && rawSubtotal >= 0 ? rawSubtotal : price * quantity;

            sanitizedItems.push({
                itemName,
                category,
                price,
                isMrp: Boolean(it.isMrp),
                quantity,
                subtotal,
            });
        }

        const computedUnits = sanitizedItems.reduce((sum, it) => sum + it.quantity, 0);
        const computedPrice = sanitizedItems.reduce((sum, it) => sum + it.subtotal, 0);

        const finalUnits =
            typeof totalUnits === "number" && !Number.isNaN(totalUnits) && totalUnits >= 1
                ? totalUnits
                : computedUnits;
        const finalPrice =
            typeof totalPrice === "number" && !Number.isNaN(totalPrice) && totalPrice >= 0
                ? totalPrice
                : computedPrice;

        const createdOrder = await OrderModel.create({
            cafeName: String(cafeName || "IDST Backpackers Cafe").trim(),
            customerName: trimmedCustomerName,
            customerNumber: trimmedCustomerNumber,
            notes: typeof notes === "string" ? notes.trim() : "",
            items: sanitizedItems,
            totalPrice: finalPrice,
            totalUnits: finalUnits,
            status: "pending",
            paymentStatus: "unpaid",
        });

        return NextResponse.json(
            {
                success: true,
                message: "Order placed successfully.",
                data: createdOrder,
            },
            {
                status: 201,
                headers: NO_CACHE_HEADERS,
            }
        );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        console.error("Error creating cafe order:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to place order.",
                error: errorMessage,
            },
            { status: 500 }
        );
    }
}
