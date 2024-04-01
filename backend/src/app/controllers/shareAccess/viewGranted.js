import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';
import solveToken from '#helpers/solveToken.js';
import getUserByID from '#helpers/getUserByID.js';

export default async function viewGranted(req, res) {
  const { jwt } = req.body;

  // Solve token
  const user = await solveToken(jwt);

  try {
    await connectDB();

    // Find granted access with accessOrigin not equal to user id
    const granted = await Product.find({
      accessOrigin: { $ne: user.id },
      access: user.id,
    });

    // Create an array of granted products
    const grantedProducts = [];

    // Loop through granted access and get access shared users
    if (granted.length > 0) {
      granted.forEach((product) => {
        grantedProducts.push(product.accessOrigin);
      });
    }

    // Create an array of granted users
    let grantedAccess = [];

    // Loop through shared access and get access shared users
    for (let i = 0; i < granted.length; i++) {
      const user = await getUserByID(granted[i]);

      // If user found push it to shared array
      if (user.status) {
        grantedAccess.push({
          id: user.data.id,
          username: user.data.username,
          email: user.data.email,
        });
      }
    }

    return res.send({
      status: 200,
      message: 'Granted access retrieved successfully.',
      granted: grantedAccess,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
