import mongoose from "mongoose";

export interface IExpense {
    name: string;
    title: string;
    description?: string;
    amount: number;
    category?: string;
    date?: string;
    receiptImage?: string;
    status?: "pending" | "approved" | "rejected";
    createdAt?: Date;
    updatedAt?: Date;
}

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    title: {
        type: String,
        required: [true, "Expense title is required"],
        trim: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0, "Amount cannot be negative"],
    },
    date: {
        type: String,
        default: "",
    },
    receiptImage: {
        type: String,
        default: "",
    },

}, { timestamps: true });

const ExpenseModel = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default ExpenseModel;
