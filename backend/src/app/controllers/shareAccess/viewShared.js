import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';
import solveToken from '#helpers/solveToken.js';
import getUserByID from '#helpers/getUserByID.js';

export default async function viewShared(req, res) {
  const { jwt } = req.query;

  // Solve token
  const user = await solveToken(jwt);

  try {
    await connectDB();

    // Find shared access
    const shared = await Product.findOne({ accessOrigin: user.id });

    // Filter to remove origin user
    const sharedAccess = shared?.access.filter((id) => id !== user.id);

    // If no shared access found
    if (!sharedAccess?.length > 0) {
      return res.send({
        status: 404,
        message: 'No shared access found.',
      });
    }

    // Create an array of shared users
    let sharedUsers = [];

    // Loop through shared access and get access shared users
    for (let i = 0; i < sharedAccess.length; i++) {
      const user = await getUserByID(sharedAccess[i]);

      // If user found push it to sharedUsers array
      if (user.status) {
        sharedUsers.push({
          id: user.data.id,
          username: user.data.username,
          email: user.data.email,
        });
      }
    }

    return res.send({
      status: 200,
      message: 'Shared access retrieved successfully.',
      shared: sharedUsers,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
