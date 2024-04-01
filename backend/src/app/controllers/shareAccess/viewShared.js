import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';
import solveToken from '#helpers/solveToken.js';
import getUserByID from '#helpers/getUserByID.js';
import checkInventory from './helpers/checkInventory.js';

export default async function viewShared(req, res) {
  const { jwt } = req.body;

  // Solve token
  const user = await solveToken(jwt);

  try {
    await connectDB();

    // Check inventory and create if not exists
    await checkInventory(req, res, user.id);

    // Find shared access
    const shared = await Product.findOne({ accessOrigin: user.id });

    // Filter to remove origin user
    const sharedProducts = shared?.access.filter((id) => id !== user.id);

    // Create an array of shared users
    let sharedAccess = [];

    // Loop through shared access and get access shared users
    for (let i = 0; i < sharedProducts.length; i++) {
      const user = await getUserByID(sharedProducts[i]);

      // If user found push it to shared array
      if (user.status) {
        sharedAccess.push({
          id: user.data.id,
          username: user.data.username,
          email: user.data.email,
        });
      }
    }

    return res.send({
      status: 200,
      message: 'Shared access retrieved successfully.',
      shared: sharedAccess,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
