import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';
import Order from '#models/orderModel.js';
import solveToken from '#helpers/solveToken.js';
import isAccessExist from './helpers/isAccessExist.js';

export default async function revokeGranted(req, res) {
  const { jwt, id } = req.body;

  // Solve token
  const user = await solveToken(jwt);

  // Check if id is provided
  if (!id) {
    return res.send({
      status: 400,
      message: 'No id provided.',
    });
  }

  // Check if user is owner
  if (user.id === id) {
    return res.send({
      status: 403,
      message: 'You can not revoke access from yourself.',
    });
  }

  // Check if user already has access
  const checkAccess = await isAccessExist(id, user.id);

  if (checkAccess === false) {
    return res.send({
      status: 404,
      message: 'No shared access found.',
    });
  }

  try {
    await connectDB();

    // Revoke access for products
    await Product.updateOne(
      { accessOrigin: id },
      { $pull: { access: user.id } },
    );

    // Revoke access for orders
    await Order.updateOne({ accessOrigin: id }, { $pull: { access: user.id } });

    return res.send({
      status: 200,
      message: 'Shared access revoked successfully.',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
