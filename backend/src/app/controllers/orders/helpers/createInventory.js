import { v4 } from 'uuid';
import connectDB from '#config/mongodb/connectDB.js';
import Order from '#models/orderModel.js';
import { scheduleOrder } from '#services/scheduleOrders.js';

const uuidv4 = v4;

export default async function createInventory(req, res, access) {
  const { order } = req.body;

  // Add unique id to product data and spread it
  const orderData = {
    id: uuidv4(),
    ...order,
  };

  try {
    // Create inventory and add order
    await connectDB();
    await Order.create({
      accessOrigin: access,
      access: [access],
      orders: [orderData],
    });

    // Schedule order
    await scheduleOrder(access, orderData.id, orderData.orderDate);

    return res.send({
      status: 200,
      message: 'Inventory created and order added successfully.',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
