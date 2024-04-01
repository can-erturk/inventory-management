import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';
import Order from '#models/orderModel.js';

export default async function checkInventory(req, res, userID) {
  try {
    await connectDB();

    // Find inventories
    const productInventory = await Product.findOne({ accessOrigin: userID });
    const orderInventory = await Order.findOne({ accessOrigin: userID });

    // If product inventory not found create one
    if (!productInventory) {
      await Product.create({
        accessOrigin: userID,
        access: [],
        products: [],
      });
    }

    // If order inventory not found create one
    if (!orderInventory) {
      await Order.create({
        accessOrigin: userID,
        access: [],
        orders: [],
      });
    }

    return true;
  } catch (error) {
    return res.send({ status: 500, message: error.message });
  }
}
