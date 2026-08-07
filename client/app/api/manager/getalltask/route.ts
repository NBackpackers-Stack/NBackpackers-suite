import taskModel from "@/models/task.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const allTasks = await taskModel.find();
        console.log("alltasks--->", allTasks);

        return NextResponse.json({ message: "tasks fetched successfully", tasks: allTasks, status: 200 });

    }
    catch (error) {
        console.log("error in getting all tasks", error);
        return NextResponse.json({ message: "Error", status: 500 });
    }
}