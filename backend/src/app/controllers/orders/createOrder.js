import connectDB from '#config/mongodb/connectDB.js';
import Order from '#models/orderModel.js';
import solveToken from '#helpers/solveToken.js';
import pushOrder from './helpers/pushOrder.js';
import createInventory from './helpers/createInventory.js';

export default async function createOrder(req, res) {
  const { jwt, order } = req.body;

  if (!order) {
    return res.send({
      status: 400,
      message: 'Order data is required.',
    });
  }

  // Solve jwt and get user id as access variable
  const { id: access } = await solveToken(jwt);

  try {
    await connectDB();

    // Check if user's order already exist
    const inventory = await Order.find({ access });

    // If inventory exist, push order to it
    // Else, create inventory and push order to it
    if (inventory.length > 0) {
      return pushOrder(req, res, access);
    } else {
      return createInventory(req, res, access);
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
