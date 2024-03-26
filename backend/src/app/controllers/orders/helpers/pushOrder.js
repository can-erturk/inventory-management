import { v4 } from 'uuid';
import connectDB from '#config/mongodb/connectDB.js';
import Order from '#models/orderModel.js';
import checkOrderExist from './checkOrderExist.js';
import { scheduleOrder } from '#services/scheduleOrders.js';

const uuidv4 = v4;

export default async function pushOrder(req, res, access) {
  const { order } = req.body;

  // Add unique id to order data and spread it
  const orderData = {
    id: uuidv4(),
    ...order,
  };

  try {
    await connectDB();

    // Check if order already exist
    const isOrderExist = await checkOrderExist(access, order.title);

    if (isOrderExist === true) {
      return res.send({
        status: 400,
        message: 'Order already exist.',
      });
    }

    // Update order
    await Order.updateOne({ access }, { $push: { orders: orderData } });

    // Schedule order
    await scheduleOrder(access, orderData.id, orderData.orderDate);

    return res.send({
      status: 200,
      message: 'Order created successfully.',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
