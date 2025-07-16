import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
    type: String,
    required: true,
    unique: true, // Ensures productId is unique
  },
  productName: {
    type: String,
    required: true,
  },
  alternativeNames: [
    {
      type: String  // Array of alternative names
    }  
  ],
  images: [
    {
      type: String, // Array of image URLs
    }
  ],
  price: {
    type: Number,
    required: true
  },
  lastPrice: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  }

})
  
const Product = mongoose.model("products", productSchema);

export default Product;

