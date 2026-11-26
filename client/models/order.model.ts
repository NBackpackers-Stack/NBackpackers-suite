import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrderItem {
    itemName: string;
    category: string;
    price: number;
    isMrp?: boolean;
    quantity: number;
    subtotal: number;
}

export type OrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled";
export type PaymentStatus = "unpaid" | "paid";

export interface IOrder extends Document {
    cafeName: string;
    customerName: string;
    customerNumber: string;
    notes?: string;
    items: IOrderItem[];
    totalPrice: number;
    totalUnits: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
    itemName: {
        type: String,
        required: [true, "Item name is required"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    isMrp: {
        type: Boolean,
        default: false,
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
    },
    subtotal: {
        type: Number,
        required: [true, "Subtotal is required"],
        min: [0, "Subtotal cannot be negative"],
    },
});

const orderSchema = new Schema<IOrder>(
    {
        cafeName: {
            type: String,
            required: [true, "Cafe name is required"],
            default: "IDST Backpackers Cafe",
            trim: true,
        },
        customerName: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true,
        },
        customerNumber: {
            type: String,
            required: [true, "Customer number is required"],
            trim: true,
        },
        notes: {
            type: String,
            default: "",
            trim: true,
        },
        items: {
            type: [orderItemSchema],
            required: [true, "Order items are required"],
            validate: {
                validator: (val: IOrderItem[]) => Array.isArray(val) && val.length > 0,
                message: "Order must contain at least one item",
            },
        },
        totalPrice: {
            type: Number,
            required: [true, "Total price is required"],
            min: [0, "Total price cannot be negative"],
        },
        totalUnits: {
            type: Number,
            required: [true, "Total units is required"],
            min: [1, "Total units must be at least 1"],
        },
        status: {
            type: String,
            enum: ["pending", "preparing", "ready", "completed", "cancelled"],
            default: "pending",
        },
        paymentStatus: {
            type: String,
            enum: ["unpaid", "paid"],
            default: "unpaid",
        },
    },
    {
        timestamps: true,
    }
);

const OrderModel: Model<IOrder> =
    (mongoose.models.Order as Model<IOrder>) ||
    mongoose.model<IOrder>("Order", orderSchema);

export default OrderModel;
