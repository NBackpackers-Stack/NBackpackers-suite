import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import OrderModel, { OrderStatus } from "@/models/order.model";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const VALID_STATUSES: ReadonlySet<OrderStatus> = new Set([
    "pending",
    "preparing",
    "ready",
    "completed",
    "cancelled",
]);

const NO_CACHE_HEADERS = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
};

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const cafeName = (searchParams.get("cafeName") || "IDST Backpackers Cafe").trim();
        const statusParam = (searchParams.get("status") || "").trim().toLowerCase();

        const parsedPage = Number.parseInt(searchParams.get("page") || "1", 10);
        const parsedLimit = Number.parseInt(searchParams.get("limit") || "10", 10);

        const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
        const limit =
            Number.isNaN(parsedLimit) || parsedLimit < 1
                ? 10
                : Math.min(parsedLimit, 100);
        const skip = (page - 1) * limit;

        const query: { cafeName: string; status?: OrderStatus } = { cafeName };
        if (statusParam && statusParam !== "all" && VALID_STATUSES.has(statusParam as OrderStatus)) {
            query.status = statusParam as OrderStatus;
        }

        const [orders, total] = await Promise.all([
            OrderModel.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            OrderModel.countDocuments(query),
        ]);

        const hasMore = skip + orders.length < total;

        return NextResponse.json(
            {
                success: true,
                data: orders,
                total,
                page,
                limit,
                hasMore,
            },
            {
                status: 200,
                headers: NO_CACHE_HEADERS,
            }
        );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        console.error("Error fetching cafe orders:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch orders from database.",
                data: [],
                error: errorMessage,
            },
            { status: 500 }
        );
    }
}
