import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';
import solveToken from '#helpers/solveToken.js';

export default async function getProducts(req, res) {
  const { product_id, jwt } = req.body;

  // Solve jwt and get user id as access variable
  const { id: access } = await solveToken(jwt);

  try {
    await connectDB();
    const getData = await Product.find({ access }).select(
      '-_id -access -__v -updatedAt -createdAt',
    );

    // Check if products exist
    if (!getData || getData.length === 0) {
      return res.send({
        status: 404,
        message: 'No products found.',
      });
    }

    // Check if product_id provided
    // If provided, return only one product
    // If not provided, return all products
    const data = product_id
      ? getData[0].products.find((product) => product.id === product_id)
      : getData[0].products;

    return res.send({
      status: 200,
      message: 'Products retrieved successfully.',
      data,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
