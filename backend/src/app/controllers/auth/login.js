import bcrypt from 'bcryptjs';
import createToken from '#helpers/createToken.js';
import connectDB from '#config/mongodb/connectDB.js';
import User from '#models/userModel.js';

export default async function login(req, res) {
  const { user, password } = req.body;

  // If user or password is not provided
  if (!user || !password) {
    return res.send({
      status: 401,
      message: 'You must provide a username and password.',
    });
  }

  try {
    await connectDB();

    // Check if user exists
    const isUserExists = user?.includes('@')
      ? await User.findOne({ email: user })
      : await User.findOne({ username: user });

    // If user doesn't exist
    if (isUserExists === null) {
      return res.send({
        status: 400,
        message: 'User does not exist.',
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExists.password,
    );

    // If password is incorrect
    if (!isPasswordCorrect) {
      return res.send({
        status: 400,
        message: 'You entered an incorrect password.',
      });
    }

    // Check if user is verified
    if (!isUserExists.activation.status) {
      return res.send({
        status: 401,
        type: 'not-verified',
        message: 'You must verify your email address.',
        data: {
          email: isUserExists.email,
        },
      });
    }

    // If password is correct
    return res.send({
      status: 200,
      message: 'User logged in successfully.',
      jwt: createToken(isUserExists),
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
