import express, { Router } from 'express';
import { createProduct, getProduct, getAllProducts } from '../controllers/Product.Controller';

const ProductRouter: Router = express.Router();

ProductRouter.get('/', getAllProducts);
ProductRouter.post('/', createProduct);
ProductRouter.get('/:id', getProduct);

export default ProductRouter;
