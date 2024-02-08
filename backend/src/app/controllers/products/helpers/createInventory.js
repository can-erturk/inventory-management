import { v4 } from 'uuid';
import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';

const uuidv4 = v4;

export default async function createInventory(req, res, access) {
  const { product } = req.body;

  // Add unique id to product data and spread it
  const productData = {
    id: uuidv4(),
    ...product,
  };

  try {
    // Create inventory and add product
    await connectDB();
    await Product.create({ access, products: [productData] });

    return res.send({
      status: 200,
      message: 'Inventory created and product added successfully.',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
