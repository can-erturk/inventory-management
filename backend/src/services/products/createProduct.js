import connectDB from '#src/lib/mongodb/connectDB.js';
import Product from '#src/lib/mongodb/models/Product.model.js';
import solveToken from '#src/lib/helpers/solveToken.js';
import pushProduct from './helpers/pushProduct.js';
import createInventory from './helpers/createInventory.js';

export default async function createProduct(req, res) {
  const { jwt, product } = req.body;

  if (!product) {
    return res.send({
      status: 400,
      message: 'Product data is required.',
    });
  }

  // Solve jwt and get user id as access variable
  const { id: access } = await solveToken(jwt);

  try {
    await connectDB();

    // Check if user's products already exist
    const inventory = await Product.find({ access });

    // If inventory exist, push product to it
    // Else, create inventory and push product to it
    if (inventory.length > 0) {
      return pushProduct(req, res, access);
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
