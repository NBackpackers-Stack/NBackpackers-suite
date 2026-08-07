import mongoose from "mongoose";

const purchaseStockItemSchema = new mongoose.Schema({
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

const purchaseStockSchema = new mongoose.Schema({
    documentId: {
        type: String,
        required: [true, "Document ID is required"],
    },
    items: {
        type: [purchaseStockItemSchema],
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

const PurchaseStockModel = mongoose.models.PurchaseStock || mongoose.model("PurchaseStock", purchaseStockSchema);

export default PurchaseStockModel;
