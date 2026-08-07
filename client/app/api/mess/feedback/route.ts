import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import FeedbackModel from "@/models/feedback.model";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // Parse the incoming multipart/form-data request
        const formData = await req.formData();

        const message = formData.get("message") as string;
        const name = formData.get("name") as string;
        const number = formData.get("number") as string;
        const batchNumber = formData.get("batchNumber") as string || "";
        const email = formData.get("email") as string;
        const ratingTaste = Number(formData.get("ratingTaste"));
        const ratingFreshness = Number(formData.get("ratingFreshness"));
        const ratingQuality = Number(formData.get("ratingQuality"));
        const ratingPortion = Number(formData.get("ratingPortion"));
        const ratingOverall = Number(formData.get("ratingOverall"));
        const imageFile = formData.get("image") as File; // This will be the File object if provided

        console.log("Feedback data received:", { message, name, number, email, hasImage: !!imageFile });

        //Saving image to coudinary and getting URL

        let imageURL: string = "";

        if (imageFile && imageFile instanceof File && imageFile.size > 0) {
            const arrayBuffer1 = await imageFile.arrayBuffer();
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

            // console.log("-----------result", uploadResponse1);

            imageURL = uploadResponse1.secure_url;
            //console.log("Image uploaded successfully", billImageURL);

        }

        const createFeedback = await FeedbackModel.create({
            message,
            name,
            number,
            batchNumber,
            email,
            ratingTaste,
            ratingFreshness,
            ratingQuality,
            ratingPortion,
            ratingOverall,
            image: imageURL
        });

        return NextResponse.json(
            {
                success: true,
                message: "Feedback saved successfully",
                data: createFeedback
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error saving feedback:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        
        // Fetch all feedback sorted by newest first
        const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                message: "Feedback retrieved successfully",
                data: feedbacks
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Error fetching feedback:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
