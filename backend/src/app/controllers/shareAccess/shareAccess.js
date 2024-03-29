import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';
import solveToken from '#helpers/solveToken.js';
import isAccessExist from './helpers/isAccessExist.js';
import getUserByID from '#helpers/getUserByID.js';

export default async function shareAccess(req, res) {
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

  // Check if user is owner
  if (user.id === id) {
    return res.send({
      status: 403,
      message: 'You already have access to the inventory.',
    });
  }

  // Check if user already has access
  const checkAccess = await isAccessExist(user.id, id);

  if (checkAccess === true) {
    return res.send({
      status: 403,
      message: 'This user already has access to the inventory.',
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
    await Product.updateOne(
      { accessOrigin: user.id },
      { $push: { access: id } },
    );

    return res.send({
      status: 200,
      message: 'Access shared successfully.',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
