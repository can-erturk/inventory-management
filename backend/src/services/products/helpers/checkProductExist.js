import connectDB from '#src/lib/mongodb/connectDB.js';
import Product from '#src/lib/mongodb/models/Product.model.js';

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
