import express from 'express';
import { createProduct, getProducts } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/", createProduct); // Route to create a new product
productRouter.get("/", getProducts); // Route to get all products

export default productRouter;