import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';

export default async function checkProductExist(access, title) {
  try {
    await connectDB();
    const inventory = await Product.find({ access });

    // Check if product already exist
    const isProductAlreadyExist = inventory[0].products.find(
      (item) => item.title === title,
    );

    return isProductAlreadyExist;
  } catch (error) {
    return error;
  }
}
