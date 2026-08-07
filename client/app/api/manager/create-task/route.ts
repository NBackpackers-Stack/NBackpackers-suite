import TaskModel from "@/models/task.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { data } = body;
        const { formattedDate, monthName, tasks } = data;

        var taskId: string = "";
        console.log("formatted date and month are ", formattedDate, monthName);


        const checkTask = await TaskModel.findOne({ date: formattedDate });

        if (checkTask) {
            taskId = checkTask?._id;
            return NextResponse.json({ message: "Task already exists", status: 404, taskId });
        }

        const newTask = new TaskModel({ date: formattedDate, month: monthName, tasks: tasks });
        const createT = await newTask.save();
        taskId = createT?._id;
        console.log("Task created", createT);
        return NextResponse.json({ message: "Task created successfully", task: newTask, taskId });
    } catch (error) {
        console.log("error in ", error);

    }
}