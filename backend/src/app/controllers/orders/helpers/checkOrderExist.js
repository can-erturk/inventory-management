import connectDB from '#config/mongodb/connectDB.js';
import Order from '#models/orderModel.js';

export default async function checkOrderExist(access, title) {
  try {
    await connectDB();
    const inventory = await Order.find({ access });

    // Check if product already exist
    const isOrderAlreadyExist = inventory[0].orders.find(
      (item) => item.title === title,
    );

    return isOrderAlreadyExist;
  } catch (error) {
    return error;
  }
}
