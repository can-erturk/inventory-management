import connectDB from '../../../lib/mongodb/connectDB.js';
import User from '../../../lib/mongodb/models/User.model.js';

export default async function checkVerification(email) {
  try {
    await connectDB();
    const user = await User.findOne({ email });

    return {
      status: user?.activation.status,
      key: user?.activation.code,
    };
  } catch (error) {
    return {
      status: 400,
      message: 'Something went wrong while checking verification.',
    };
  }
}
