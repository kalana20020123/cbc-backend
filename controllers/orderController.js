import Order from "../models/order.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req, res) {

    if (!isCustomer(req)) {
        res.json({
            message: "You should log in as a customer to create an order"
        });
        return;
    }
   
    try{
        const latestOrder = await Order.find().sort  
        ({date : -1}).limit(1); // Get the latest order

        let orderId;
        if(latestOrder.length == 0){
            orderId = "CBC0001"
        }else{ // If there are existing orders, increment the last order ID
            const currentOrderId = latestOrder[0].orderId;

            const numberString = currentOrderId.replace("CBC", "");
            const number = parseInt(numberString);

            orderId = "CBC" + (number + 1).toString().padStart(4, '0');
        }

        const newOrderData = req.body;
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