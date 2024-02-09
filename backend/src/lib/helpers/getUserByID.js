import connectDB from '#config/mongodb/connectDB.js';
import User from '#models/userModel.js';

export default async function getUserByID(id) {
  // If no id provided
  if (!id) {
    return {
      status: false,
      message: 'No id provided.',
    };
  }

  try {
    await connectDB();
    const user = await User.findById(id);

    // If no user found
    if (!user) {
      return {
        status: false,
        message: 'User not found.',
      };
    }

    // Return user
    return {
      status: true,
      message: 'User found.',
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        activation: user.activation.status,
      },
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}
