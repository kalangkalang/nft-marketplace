import { Document } from "mongoose";

export interface IProduct extends Document {
    product_name: string;
    price: number;
    quantity: number;
    description: string;
    reputation: number;
    reputation_status: string;
    availability: number;
    categories: string[];
    created_at: Date;
    modified_at: Date;
    created_by: string;
}