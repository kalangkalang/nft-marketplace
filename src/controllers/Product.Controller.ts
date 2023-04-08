import { Request, Response, NextFunction } from "express";
import { IProduct } from "../models/IProduct";
import { ItemModel } from "../models/ProductSchema";
import { getRatingStatus } from "../utils/Util";

async function createItem(item: IProduct): Promise<IProduct> {
    const newItem = new ItemModel(item);
    return newItem.save();
}

async function getItembyId(id: string): Promise<IProduct | null> { 
    const item = await ItemModel.findById(id);
    return item;
}

async function getAllItem(): Promise<IProduct[]> {
    const allItems = await ItemModel.find();
    return allItems;
}

export const createProduct = async (req:Request, res:Response, next:NextFunction) => {
    try {
        
        const { product_name, price, description,  quantity, reputation, availability, created_by } = req.body;
        
        const reputation_status = getRatingStatus(reputation);
        const created_at = new Date(new Date().getTime());
        const modified_at = new Date(new Date().getTime()); 
        const categories = new Array<string>();

        const newProduct: IProduct  = new ItemModel({
            product_name,
            price,
            quantity,
            description,
            reputation,
            reputation_status,
            availability,
            categories,
            created_at,
            modified_at,
            created_by,
        });

        const createdProduct: IProduct = await createItem(newProduct);
        res.json(createdProduct);
    } catch(err: any) {
        console.log("There is an errro with message: " + err.message);
    }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product:IProduct | null = await getItembyId(req.params.id);
        res.json(product);
    } catch (err: any) {
        console.log("There is an errro with message: " + err.message);
    }
};

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allProducts:IProduct[] = await getAllItem();
        res.json(allProducts);
    } catch (err: any) {
        console.log("There is an errro with message: " + err.message);
    }
};

