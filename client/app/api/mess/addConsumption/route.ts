import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import ConsumptionModel from "@/models/consumption.model";
import InventoryModel from "@/models/inventory.model";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const stockData = await req.formData();

        const data = JSON.parse(stockData.get("data") as string);

        const billImage = stockData.get("image") as File;

        const stockDocumentId = data.documentId;

        const getStockToBeUpdated = await InventoryModel.findById(stockDocumentId);

        if (!getStockToBeUpdated) {
            return NextResponse.json(
                { success: false, message: "Stock not found" },
                { status: 404 }
            );
        }


        //console.log("here is that stock", getStockToBeUpdated);

        const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner', 'Other'];

        mealTypes.forEach(meal => {
            if (data[meal] && Array.isArray(data[meal])) {
                data[meal].forEach((consumedItem: any) => {
                    const stockItemIndex = getStockToBeUpdated.items.findIndex(
                        (item: any) => item._id.toString() === consumedItem.id
                    );

                    if (stockItemIndex !== -1) {
                        getStockToBeUpdated.items[stockItemIndex].current_stock -= Number(consumedItem.quantity);
                    }
                });
            }
        });

        await getStockToBeUpdated.save();

        //Saving image to coudinary and getting URL

        let billImageURL: string = "";

        if (billImage && billImage instanceof File && billImage.size > 0) {
            const arrayBuffer1 = await billImage.arrayBuffer();
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

            billImageURL = uploadResponse1.secure_url;
            //console.log("Image uploaded successfully", billImageURL);

        }

        data.imageUrl = billImageURL

        //console.log("the data we are sending to consumption model", data)


        const createConsumption = await ConsumptionModel.create(data);

        return NextResponse.json(
            {
                success: true, message: "Consumption data saved successfully",
                data: createConsumption
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error saving consumption data:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
