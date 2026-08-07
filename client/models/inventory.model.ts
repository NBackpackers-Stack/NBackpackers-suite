import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: [true, "Item name is required"],
    },
    item_id: {
        type: String,
        required: [true, "Item ID is required"],
    },
    current_stock: {
        type: Number,
        required: [true, "Stock is required"],
        default: 0,
    },
    unit: {
        type: String,
        required: [true, "Unit is required"],
    }
});

const inventorySchema = new mongoose.Schema({
    messName: {
        type: String,
        required: [true, "Mess name is required"],
    },
    items: [itemSchema],
}, {
    timestamps: true // This automatically adds `createdAt` (time stamp) and `updatedAt` (last updated)
});

const InventoryModel = mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);

export default InventoryModel;
