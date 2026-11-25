import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMenuItem {
    category: string;
    item: string;
    price: string;
    isAvailable?: boolean;
}

export interface IMenu extends Document {
    cafeName: string;
    items: IMenuItem[];
    createdAt: Date;
    updatedAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>({
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
    },
    item: {
        type: String,
        required: [true, "Item name is required"],
        trim: true,
    },
    price: {
        type: String,
        required: [true, "Price is required"],
        trim: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
});

const menuSchema = new Schema<IMenu>(
    {
        cafeName: {
            type: String,
            required: [true, "Cafe name is required"],
            default: "IDST Backpackers Cafe",
            trim: true,
        },
        items: {
            type: [menuItemSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const MenuModel: Model<IMenu> =
    (mongoose.models.Menu as Model<IMenu>) ||
    mongoose.model<IMenu>("Menu", menuSchema);

export default MenuModel;
