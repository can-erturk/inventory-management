import connectDB from '#config/mongodb/connectDB.js';
import Order from '#models/orderModel.js';
import solveToken from '#helpers/solveToken.js';
import { cancelOrder } from '#services/scheduleOrders.js';

export default async function deleteOrder(req, res) {
  const { jwt, order_id } = req.body;

  // Solve jwt and get user id as access variable
  const { id: access } = await solveToken(jwt);

  try {
    await connectDB();
    await Order.updateMany({ access }, { $pull: { orders: { id: order_id } } });

    await cancelOrder(order_id);

    return res.send({
      status: 200,
      message: 'Order deleted successfully.',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
