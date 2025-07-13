import express from "express";
import {createProduct, getProduct, deleteProduct, getProductByName} from "../controllers/productController.js";

//create productRouter
const productRouter = express.Router();  

productRouter.post("/",createProduct);
productRouter.get("/",getProduct);
productRouter.get("/:name", getProductByName); // Get product by name //name kiynne variable ekak postman ekn ena sample name ekt samna wenwa
productRouter.delete("/:name",deleteProduct); //delete product by name

export default productRouter;







