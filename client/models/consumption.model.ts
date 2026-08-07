import mongoose from "mongoose";

const consumptionItemSchema = new mongoose.Schema({
    id: {
        type: String,
        //required: [true, "Item ID is required"],
    },
    item: {
        type: String,
        //required: [true, "Item name is required"],
    },
    quantity: {
        type: Number,
        //required: [true, "Quantity is required"],
    },
    unit: {
        type: String,
        //required: [true, "Unit is required"],
    }
});

const consumptionSchema = new mongoose.Schema({
    documentId: {
        type: String,
        required: [true, "Document ID is required"],
    },
    Breakfast: {
        type: [consumptionItemSchema],
        default: []
    },
    Lunch: {
        type: [consumptionItemSchema],
        default: []
    },
    Snack: {
        type: [consumptionItemSchema],
        default: []
    },
    Dinner: {
        type: [consumptionItemSchema],
        default: []
    },
    Other: {
        type: [consumptionItemSchema],
        default: []
    },
    imageUrl: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // This automatically adds `createdAt` and `updatedAt`
});

const ConsumptionModel = mongoose.models.Consumption || mongoose.model("Consumption", consumptionSchema);

export default ConsumptionModel;
