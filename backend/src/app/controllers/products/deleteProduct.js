import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';
import solveToken from '#helpers/solveToken.js';

export default async function deleteProduct(req, res) {
  const { jwt, product_id } = req.body;

  // Solve jwt and get user id as access variable
  const { id: access } = await solveToken(jwt);

  try {
    await connectDB();
    await Product.findOneAndUpdate(
      { access },
      { $pull: { products: { id: product_id } } },
    );

    return res.send({
      status: 200,
      message: 'Product deleted successfully.',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
