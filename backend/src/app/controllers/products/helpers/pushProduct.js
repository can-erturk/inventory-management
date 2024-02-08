import { v4 } from 'uuid';
import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';
import checkProductExist from './checkProductExist.js';

const uuidv4 = v4;

export default async function pushProduct(req, res, access) {
  const { product } = req.body;

  // Add unique id to product data and spread it
  const productData = {
    id: uuidv4(),
    ...product,
  };

  try {
    await connectDB();

    // Check if product already exist
    const isProductExist = await checkProductExist(access, product.title);

    if (isProductExist === true) {
      return res.send({
        status: 400,
        message: 'Product already exist.',
      });
    }

    // Update product
    await Product.updateOne({ access }, { $push: { products: productData } });

    return res.send({
      status: 200,
      message: 'Product created successfully.',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
