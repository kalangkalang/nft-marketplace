import { Request, Response, NextFunction } from "express";
import { IProduct } from "../models/IProduct";
import { ItemModel } from "../models/ProductSchema";
import Util from "../utils/Util";

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

async function deleteItem(id: string): Promise<void> {
    await ItemModel.findByIdAndDelete(id);
}

async function updateItem(id: string, item: Partial<IProduct>): Promise<IProduct | null> {
    const updatedItem = await ItemModel.findByIdAndUpdate(id, item, { new: true });
    return updatedItem;
}

const createProduct = async (req:Request, res:Response, next:NextFunction) => {
    try {
        
        const { product_name, price, description,  quantity, reputation, availability, created_by } = req.body;
        
        const reputation_status = Util.getRatingStatus(reputation);
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
        console.log("There is an error with message: " + err.message);
    }
}

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product:IProduct | null = await getItembyId(req.params.id);
        res.json(product);
    } catch (err: any) {
        console.log("There is an error with message: " + err.message);
    }
};

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allProducts:IProduct[] = await getAllItem();
        res.json(allProducts);
    } catch (err: any) {
        console.log("There is an error with message: " + err.message);
    }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        deleteItem(req.params.id);
        res.status(204).send();
    } catch (err: any) {
        console.log("There is an error with message: " + err.message);
    };
};

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const updates = req.body;

    try {
        let reputation_status;
        if (updates.reputation) {
            reputation_status = Util.getRatingStatus(updates.reputation);
        }

        const updatedProduct: Partial<IProduct> = { ...updates };
        if (reputation_status) {
            updatedProduct.reputation_status = reputation_status;
        }

        const newProduct: IProduct | null = await updateItem(id, updatedProduct);
        
        if (!newProduct) {
            return res.status(404).send();
        }
        res.json(newProduct);
    } catch (err: any) {
        console.log("There is an error with message: " + err.message);
    };
};

export default {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}

