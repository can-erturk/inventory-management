import connectDB from '#src/lib/mongodb/connectDB.js';
import User from '#src/lib/mongodb/models/User.model.js';
import getEnv from '#src/lib/helpers/getEnv.js';

const frontendUrl = getEnv('FRONTEND_BASE_URL');

export default async function verificationURL(email) {
  try {
    await connectDB();

    // Get verification key from db
    const { activation } = await User.findOne({ email }, 'activation.key');

    // If there is no key, return error
    if (!activation.key) {
      return {
        status: 400,
        message: 'Verification key not found.',
      };
    }

    // Return verification url
    return {
      status: 200,
      message: 'Verification URL generated.',
      url: `${frontendUrl}/verify-email?key=${activation.key}`,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Something went wrong while generating verification URL.',
    };
  }
}
