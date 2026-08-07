import RecciModel from "@/models/recci.model";
import connectDB from "@/utils/db";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const formData = await request.formData();
        console.log("Form Data:", formData);

        const recciData: any = {};

        for (const [key, value] of formData.entries()) {
            let catKey = "";
            let fieldKey = "";

            if (key.includes('[')) {
                const parts = key.split('[');
                catKey = parts[0];
                fieldKey = parts[1].replace(']', '');
                if (!recciData[catKey]) {
                    recciData[catKey] = {};
                }
            }

            if (value instanceof File && value.size > 0) {
                const arrayBuffer = await value.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                const uploadResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream({
                        folder: "recci_tours", // optional organization of images
                    },
                        (error, result) => {
                            if (error) reject(error);
                            else if (!result) reject(new Error("No result from Cloudinary"));
                            else resolve(result);
                        }
                    );
                    uploadStream.end(buffer);
                });

                if (catKey) {
                    recciData[catKey][fieldKey] = uploadResponse.secure_url;
                } else {
                    recciData[key] = uploadResponse.secure_url;
                }
            } else if (typeof value === "string") {
                if (catKey) {
                    recciData[catKey][fieldKey] = value;
                } else {
                    recciData[key] = value;
                }
            }
        }

        console.log("Saving RECCI data:", recciData);

        const newRecci = new RecciModel(recciData);
        await newRecci.save();

        return NextResponse.json({ success: true, message: "RECCI Tour saved successfully!" });
    } catch (error) {
        console.error("API Error saving RECCI:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
