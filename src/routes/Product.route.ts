import express, { Router } from 'express';
import ProductController from '../controllers/Product.Controller';

const ProductRouter: Router = express.Router();

ProductRouter.get('/', ProductController.getAllProducts);
ProductRouter.post('/', ProductController.createProduct);
ProductRouter.patch('/:id', ProductController.updateProduct);
ProductRouter.get('/:id', ProductController.getProduct);
ProductRouter.delete('/:id', ProductController.deleteProduct);

export default ProductRouter;
