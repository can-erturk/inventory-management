import connectDB from '#config/mongodb/connectDB.js';
import Order from '#models/orderModel.js';
import solveToken from '#helpers/solveToken.js';

export default async function getOrders(req, res) {
  const { order_id, jwt } = req.body;

  // Solve jwt and get user id as access variable
  const { id: access } = await solveToken(jwt);

  try {
    await connectDB();
    const getData = await Order.find({ access: { $in: [access] } }).select(
      '-__v -updatedAt -createdAt',
    );

    // Check if orders exist
    if (!getData || getData.length === 0) {
      return res.send({
        status: 404,
        message: 'No orders found.',
      });
    }

    // Create an array of orders
    const data = [];

    if (order_id) {
      // If order_id provided, return only one order
      getData.forEach((orderData) => {
        orderData.orders.forEach((p) => {
          if (p.id === order_id) {
            data.push(p);
          }
        });
      });
    } else {
      // If order_id not provided, return all orders
      getData.forEach((orderData) => {
        orderData.orders.forEach((p) => {
          data.push(p);
        });
      });
    }

    return res.send({
      status: 200,
      message: 'Orders retrieved successfully.',
      data,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
