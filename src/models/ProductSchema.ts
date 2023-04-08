import { Schema } from "mongoose";
import { model } from "mongoose";
import { IProduct } from "./IProduct";


export const ProductSchema = new Schema<IProduct>({
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: false, default: 0 },
    description: { type: String, required: false },
    reputation: { type: Number, required: true },
    reputation_status: { type: String, required: false, default: null},
    availability: { type: Number, required: true },
    categories: { type: [Schema.Types.String], required: false },
    created_at: { type: Date, required:false, default: new Date() },
    modified_at: { type: Date, required: false, default: new Date()},
    created_by: { type:String, required: false, default: null }
});

export const ItemModel = model<IProduct>('product', ProductSchema);