import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';
import solveToken from '#helpers/solveToken.js';

export default async function getProducts(req, res) {
  const { product_id, jwt } = req.body;

  // Solve jwt and get user id as access variable
  const { id: access } = await solveToken(jwt);

  try {
    await connectDB();
    const getData = await Product.find({ access: { $in: [access] } }).select(
      '-__v -updatedAt -createdAt',
    );

    // Check if products exist
    if (!getData || getData.length === 0) {
      return res.send({
        status: 404,
        message: 'No products found.',
      });
    }

    // Create an array of products
    const data = [];

    if (product_id) {
      // If product_id provided, return only one product
      getData.forEach((productData) => {
        productData.products.forEach((product) => {
          if (p.id === product_id) {
            data.push(product);
          }
        });
      });
    } else {
      // If product_id not provided, return all products
      getData.forEach((productData) => {
        productData.products.forEach((product) => {
          data.push(product);
        });
      });
    }

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
