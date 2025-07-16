import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

// Function to create a new product
export async function createProduct(req, res) {
    const newProductData = req.body;

    // Check if the user is an admin
    if (!isAdmin(req)) {
        res.json({
            message: "You should log in as an admin to create a product"
        });
        return;
    }

    try {
        const newProduct = new Product(newProductData);
        await newProduct.save();
        res.json({
            message: "Product created successfully",
        });
    } catch (error) {
        res.json({
            message: "Error creating product",
        });
    }
}

// Function to get all products
export async function getProducts(req, res) {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.json({
            message: "Error fetching products",
        });
    }
}