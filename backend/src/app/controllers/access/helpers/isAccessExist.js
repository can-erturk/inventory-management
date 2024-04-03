import connectDB from '#config/mongodb/connectDB.js';
import Product from '#models/productModel.js';

export default async function isAccessExist(userID, accessID) {
  if (!userID || !accessID) {
    return false;
  }

  try {
    await connectDB();

    const isAccessExist = await Product.findOne({
      accessOrigin: userID,
      access: accessID,
    });

    if (!isAccessExist) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
}
