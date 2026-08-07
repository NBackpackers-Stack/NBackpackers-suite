import TaskModel from "@/models/task.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params
        const tasks = await TaskModel.findById(id);
        if (!tasks) {
            return NextResponse.json({ message: "No tasks found", status: 404 });
        }
        return NextResponse.json({ message: "Tasks fetched successfully", status: 200, tasks });
    } catch (error) {
        console.log("error in getting task", error);
        return NextResponse.json({ message: "Error in getting task", status: 500, error });
    }
}