import connectDB from '#src/lib/mongodb/connectDB.js';
import Product from '#src/lib/mongodb/models/Product.model.js';
import solveToken from '#src/lib/helpers/solveToken.js';
import checkProductExist from './helpers/checkProductExist.js';

export default async function updateProduct(req, res) {
  const { jwt, product_id, updated_product } = req.body;

  // Check if update_field and updated_value provided
  if (!updated_product) {
    return res.send({
      status: 400,
      message: 'Updated product data is required.',
    });
  }

  // Check if updated product is valid
  if (updated_product.id || updated_product.access) {
    return res.send({
      status: 400,
      message: 'ID cannot be updated!',
    });
  }

  // Solve jwt and get user id as access variable
  const { id: access } = await solveToken(jwt);

  try {
    await connectDB();

    // Check if product already exist
    const newTitle = updated_product?.title;
    const isProductExist = await checkProductExist(access, newTitle);

    if (newTitle && isProductExist === true) {
      return res.send({
        status: 400,
        message: 'Product already exist.',
      });
    }

    // Create promises array
    const updatePromise = [];

    // Loop through updated_product object and update each field
    for (const [key, value] of Object.entries(updated_product)) {
      updatePromise.push(
        await Product.findOneAndUpdate(
          { access, 'products.id': product_id },
          { $set: { [`products.$.${key}`]: value } },
        ),
      );
    }

    // Run all update promises
    await Promise.all(updatePromise);

    return res.send({
      status: 200,
      message: 'Product updated successfully',
    });
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
}
