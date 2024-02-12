import connectDB from '#config/mongodb/connectDB.js';
import Order from '#models/orderModel.js';
import solveToken from '#helpers/solveToken.js';

export default async function getOrders(req, res) {
  const { order_id, jwt } = req.body;

  // Solve jwt and get user id as access variable
  const { id: access } = await solveToken(jwt);

  try {
    await connectDB();
    const getData = await Order.find({ access }).select(
      '-_id -access -__v -updatedAt -createdAt',
    );

    // Check if orders exist
    if (!getData || getData.length === 0) {
      return res.send({
        status: 404,
        message: 'No orders found.',
      });
    }

    // Check if order_id provided
    // If provided, return only one order
    // If not provided, return all orders
    const data = order_id
      ? getData[0].orders.find((order) => order.id === order_id)
      : getData[0].orders;

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
