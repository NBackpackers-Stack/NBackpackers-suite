import TripModel from "@/models/trip.model";
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
        console.log("Task submission is hitting");
        const tripId = req.nextUrl.searchParams.get('tripId');
        console.log("trip", tripId);

        const formData = await req.formData();
        console.log("Data: ", formData);

        let firstImageUrl: string = ""
        let secondImageUrl: string = ""

        const taskDataStr = formData.get("taskData") as string;
        if (!taskDataStr) {
            return NextResponse.json({ message: "No task data provided" }, { status: 400 });
        }

        const body = JSON.parse(taskDataStr);
        console.log("Body: ", body);


        const firstImage = formData.get("firstImage") as File;
        console.log("First Image: ", firstImage);

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

        const taskId = body._id;
        console.log("task id", taskId);

        const trip = await TripModel.findById(tripId);

        console.log("trip", trip);

        if (!trip) {
            return NextResponse.json({ message: "Trip not found" }, { status: 404 });
        }

        for (let i: number = 0; i < trip.groups.length; i++) {
            console.log("is it running or not");

            for (let j: number = 0; j < trip.groups[i].tasks.length; j++) {
                console.log("is it running or not in loop 2 ");
                if (trip.groups[i].tasks[j]._id == taskId) {
                    console.log("----->", trip.groups[i].tasks[j]);
                    trip.groups[i].tasks[j].status = body.status;
                    trip.groups[i].tasks[j].userRemark = body.userRemark;
                    trip.groups[i].tasks[j].submittedAt = body.submittedAt;
                    trip.groups[i].tasks[j].firstImageUrl = firstImageUrl;
                    trip.groups[i].tasks[j].secondImageUrl = secondImageUrl;
                    await trip.save();
                    return NextResponse.json({ message: "Task submitted successfully" });
                }
            }
        }

        return NextResponse.json({ message: "Something went wrong" });
    } catch (error) {
        console.error("Error submitting task:", error);
        return NextResponse.json({ message: "Error submitting task" }, { status: 500 });
    }
}