import taskModel from "@/models/task.model";
import connectDB from "@/utils/db";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        console.log("Manager update-task is hitting");

        const dayId = req.nextUrl.searchParams.get('dayId') || "";
        console.log("dayId:", dayId);

        let firstImageUrl: string = ""
        let secondImageUrl: string = ""

        const formData = await req.formData();
        console.log("Data: ", formData);

        const taskDataStr = formData.get("taskData") as string;
        if (!taskDataStr) {
            return NextResponse.json({ message: "No task data provided" }, { status: 400 });
        }

        const body = JSON.parse(taskDataStr);
        console.log("Body: ", body);

        const firstImage = formData.get("firstImage") as File;
        console.log("First Image:------> ", firstImage);

        const secondImage = formData.get("secondImage") as File;
        console.log("Second Image: ", secondImage);

        //Converting file into buffer

        //for first image

        if (firstImage && firstImage instanceof File && firstImage.size > 0) {
            const arrayBuffer1 = await firstImage.arrayBuffer();
            const buffer1 = Buffer.from(arrayBuffer1);

            const uploadResponse1 = await new Promise<UploadApiResponse>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: "task-manager", //optional organization of images
                },
                    (error, result) => {
                        if (error) reject(error);
                        else if (!result) reject(new Error("No result from Cloudinary"));
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer1)
            })

            firstImageUrl = uploadResponse1.secure_url;

        }

        //for second image
        if (secondImage && secondImage instanceof File && secondImage.size > 0) {
            const arrayBuffer2 = await secondImage.arrayBuffer();
            const buffer2 = Buffer.from(arrayBuffer2);

            const uploadResponse2 = await new Promise<UploadApiResponse>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: "task-manager", //optional organization of images
                },
                    (error, result) => {
                        if (error) reject(error);
                        else if (!result) reject(new Error("No result from Cloudinary"));
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer2)
            })

            secondImageUrl = uploadResponse2.secure_url;
        }


        console.log("reached here");

        const dayDoc = await taskModel.findById(dayId);


        if (!dayDoc) {
            return NextResponse.json({ message: "Day document not found" }, { status: 404 });
        }

        //checking if the task exist or not
        const taskTobeUpdated = dayDoc.tasks.find((task: any) => task._id.toString() === body._id);

        //if task doesn't existed the insert that in the task array
        if (!taskTobeUpdated) {
            const newTask = {
                task: body.task || "",
                time: body.time || "",
                status: body.status || "pending",
                submittedAt: body.submittedAt || "",
                firstImageUrl: firstImageUrl,
                secondImageUrl: secondImageUrl,
            };
            const updatedTask = await dayDoc.tasks.push(newTask);

            console.log("Updated Task:", updatedTask);
            if (!updatedTask) {
                return NextResponse.json({ message: "Task not updated" }, { status: 500 });
            }

            await dayDoc.save();

            return NextResponse.json({ message: "Task added successfully" });
        }

        //if task exist then upated one 
        taskTobeUpdated.firstImageUrl = firstImageUrl;
        taskTobeUpdated.secondImageUrl = secondImageUrl;
        taskTobeUpdated.time = body.time;
        taskTobeUpdated.status = body.status;
        taskTobeUpdated.submittedAt = body.submittedAt;
        taskTobeUpdated.task = body.task;
        await dayDoc.save();

        return NextResponse.json({ message: "Task updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}