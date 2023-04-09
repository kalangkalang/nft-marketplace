import { Schema } from "mongoose";
import { model } from "mongoose";
import { IProduct } from "./IProduct";


export const ProductSchema = new Schema<IProduct>({
    product_name: { type: String, required: true },
    price: { type: Number, required: true, default:0 },
    quantity: { type: Number, required: false, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    description: { type: String, required: false },
    image_url: { type: String, required: true, default: null },
    reputation: { type: Number, required: true, default:0 },
    reputation_status: { type: String, required: false, default: null},
    availability: { type: Number, required: true, default:0 },
    categories: { type: String, required: true, default: null},
    created_at: { type: Date, required:false, default: new Date() },
    modified_at: { type: Date, required: false, default: new Date()},
    created_by: { type:String, required: false, default: null }
});

export const ItemModel = model<IProduct>('product', ProductSchema);