import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import ConsumptionModel from "@/models/consumption.model";
import PurchaseStockModel from "@/models/purchaseStock.model";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        
        const type = req.nextUrl.searchParams.get('type');
        const searchDate = req.nextUrl.searchParams.get('date');
        const searchItem = req.nextUrl.searchParams.get('item');
        
        let query: any = {};
        
        if (searchDate) {
            const startOfDay = new Date(searchDate);
            startOfDay.setUTCHours(0, 0, 0, 0);
            
            const endOfDay = new Date(searchDate);
            endOfDay.setUTCHours(23, 59, 59, 999);
            
            query.$or = [
                { date: { $gte: startOfDay, $lte: endOfDay } },
                { createdAt: { $gte: startOfDay, $lte: endOfDay } }
            ];
        }
        
        if (type === 'consumption') {
            if (searchItem) {
                const itemRegex = new RegExp(searchItem, 'i');
                const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner', 'Other'];
                
                const itemQuery = {
                    $or: mealTypes.map(meal => ({
                        [`${meal}.item`]: itemRegex
                    }))
                };
                
                if (query.$or) {
                    query = { $and: [ { $or: query.$or }, itemQuery ] };
                } else {
                    query = itemQuery;
                }
            }
            
            const history = await ConsumptionModel.find(query).sort({ createdAt: -1 }).limit(100);
            return NextResponse.json({ success: true, data: history }, { status: 200 });
            
        } else if (type === 'purchase') {
            if (searchItem) {
                const itemRegex = new RegExp(searchItem, 'i');
                const itemQuery = { 'items.item': itemRegex };
                
                if (query.$or) {
                    query = { $and: [ { $or: query.$or }, itemQuery ] };
                } else {
                    query = itemQuery;
                }
            }
            
            const history = await PurchaseStockModel.find(query).sort({ createdAt: -1 }).limit(100);
            return NextResponse.json({ success: true, data: history }, { status: 200 });
        }
        
        return NextResponse.json({ success: false, message: "Invalid type parameter" }, { status: 400 });
        
    } catch (error: any) {
        console.error("Error fetching reports:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
