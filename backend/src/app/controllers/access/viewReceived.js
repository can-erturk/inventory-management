import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';
import solveToken from '#helpers/solveToken.js';
import getUserByID from '#helpers/getUserByID.js';

export default async function viewReceived(req, res) {
  const { jwt } = req.body;

  // Solve token
  const user = await solveToken(jwt);

  try {
    await connectDB();

    // Find received access with accessOrigin not equal to user id
    const received = await Product.find({
      accessOrigin: { $ne: user.id },
      access: user.id,
    });

    // Create an array of received products
    const receivedProducts = [];

    // Loop through received access and get access shared users
    if (received.length > 0) {
      received.forEach((product) => {
        receivedProducts.push(product.accessOrigin);
      });
    }

    // Create an array of received users
    let receivedAccess = [];

    // Loop through shared access and get access shared users
    for (let i = 0; i < receivedProducts.length; i++) {
      const user = await getUserByID(receivedProducts[i]);

      // If user found push it to shared array
      if (user.status) {
        receivedAccess.push({
          id: user.data.id,
          username: user.data.username,
          email: user.data.email,
        });
      }
    }

    return res.send({
      status: 200,
      message: 'Received access retrieved successfully.',
      received: receivedAccess,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
