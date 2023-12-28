import connectDB from '#src/lib/mongodb/connectDB.js';
import User from '#src/lib/mongodb/models/User.model.js';

export default async function checkVerification(email) {
  try {
    await connectDB();
    const user = await User.findOne({ email });

    return {
      status: user?.activation.status,
      key: user?.activation.key,
      keyExpiresAt: user?.activation.keyExpiresAt,
    };
  } catch (error) {
    return {
      status: 400,
      message: 'Something went wrong while checking verification.',
    };
  }
}
