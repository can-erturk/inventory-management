import connectDB from '#config/mongodb/connectDB.js';
import User from '#models/userModel.js';
import solveToken from './solveToken.js';

export default async function getUser(jwt) {
  // If jwt is not provided
  if (!jwt) {
    return {
      status: false,
      message: 'You must provide a jwt token.',
    };
  }

  // Try to solve token
  const solvedToken = await solveToken(jwt);

  // If token is not valid
  if (solvedToken.status !== true) {
    return {
      status: false,
      message: solvedToken.message,
    };
  }

  try {
    await connectDB();
    const user = await User.findOne({ username: solvedToken.username });

    // Check if user exists and return user data
    // Otherwise return error
    if (user) {
      return {
        status: true,
        message: 'User found.',
        data: {
          username: user.username,
          email: user.email,
          activation: user.activation.status,
        },
      };
    } else {
      return {
        status: false,
        message: 'User is not found!',
      };
    }
  } catch (err) {
    return {
      status: false,
      message: err.message,
    };
  }
}
