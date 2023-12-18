import bcrypt from 'bcryptjs';
import createToken from '../../lib/helpers/createToken.js';
import connectDB from '../../lib/mongodb/connectDB.js';
import User from '../../lib/mongodb/models/User.model.js';

export default async function register(req, res) {
  const { username, email, password } = req.body;

  // If username, email or password is not provided
  if (!username || !email || !password) {
    return res.send({
      status: 401,
      message: 'Invalid credentials',
      res: {},
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await connectDB();

    // Check if user exists
    const isEmailExists = await User.findOne({ email });
    const isUsernameExists = await User.findOne({ username });

    // If email exists
    if (isEmailExists !== null) {
      return res.send({ message: 'This email is already in use.' });
    }

    // If username exists
    if (isUsernameExists !== null) {
      return res.send({ message: 'This username is already in use.' });
    }

    // Save user to database if user doesn't exist
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // If user is saved to database
    return res.send({
      status: 200,
      message: 'User created successfully.',
      jwt: createToken(user),
    });
  } catch (error) {
    return res.send({ message: error.message });
  }
}
