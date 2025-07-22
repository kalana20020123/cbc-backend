import Order from "../models/order.js";
import { isCustomer } from "./userController.js";
import Product from "../models/product.js";


// Function to create a new order
export async function createOrder(req, res) {

    if (!isCustomer(req)) { // Check if the user is a customer
        res.json({
            message: "You should log in as a customer to create an order"
        });
        return;
    }
   
    try{
        const latestOrder = await Order.find().sort  
        ({date : -1}).limit(1); // Get the latest order (anthimt adpu eke id soya ganima)

        let orderId;
        if(latestOrder.length == 0){
            orderId = "CBC0001"
        }else{ // If there are existing orders, increment the last order ID
            const currentOrderId = latestOrder[0].orderId; 

            const numberString = currentOrderId.replace("CBC", "");
            const number = parseInt(numberString);

            orderId = "CBC" + (number + 1).toString().padStart(4, '0');
        }

        const newOrderData = req.body; // Get the order data from the request body

        const newProductArray = []; // create an array to hold product details
        
        for(let i = 0; i < newOrderData.orderedItems.length; i++) { // Loop through each ordered item
            const product = await Product.findOne({
                productId: newOrderData.orderedItems[i].productId
            })

            if (product == null){
                res.json({
                    message: "Product with id " + newOrderData.orderedItems[i].productId + " not found"
                });
                return
            }

            newProductArray[i] ={     
                name: product.productName,
                price: product.price,
                quantity: newOrderData.orderedItems[i].quantity,
                image: product.images[0]
            }
            

        }

        newOrderData.orderedItems = newProductArray;

        newOrderData.orderId = orderId;
        newOrderData.email = req.user.email; // Assuming req.user contains user info
            
        const order = new Order(newOrderData);

        await order.save()
        res.json({
            message: "Order created successfully",
        });

    }catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}

// Function to get all orders for the logged-in user
export async function getOrders(req, res) {
   
    try {
        const orders = await Order.find({ email: req.user.email });
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}