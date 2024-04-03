import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';
import Order from '#models/orderModel.js';
import solveToken from '#helpers/solveToken.js';
import isAccessExist from './helpers/isAccessExist.js';
import getUserByID from '#helpers/getUserByID.js';
import checkInventory from './helpers/checkInventory.js';

export default async function receiveAccess(req, res) {
  const { jwt, id } = req.body;

  // Check if id is provided
  if (!id) {
    return res.send({
      status: 400,
      message: 'No id provided.',
    });
  }

  // Solve token
  const user = await solveToken(jwt);

  // Check if user already has access
  const checkAccess = await isAccessExist(id, user.id);

  // Check if user is owner
  if (id === user.id || checkAccess === true) {
    return res.send({
      status: 403,
      message: 'You already have access to the inventory.',
    });
  }

  // Check if user exists
  const requestedUser = await getUserByID(id);

  if (!requestedUser.status) {
    return res.send({
      status: 404,
      message: 'User not found.',
    });
  }

  try {
    await connectDB();

    // Check inventory and create if not exist
    await checkInventory(req, res, id);

    // Share access for products
    await Product.updateOne(
      { accessOrigin: id },
      { $push: { access: user.id } },
    );

    // Share access for orders
    await Order.updateOne({ accessOrigin: id }, { $push: { access: user.id } });

    return res.send({
      status: 200,
      message: 'Access received successfully.',
      username: requestedUser.data.username,
      email: requestedUser.data.email,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
