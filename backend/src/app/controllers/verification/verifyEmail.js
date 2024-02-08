import connectDB from '#config/mongodb/connectDB.js';
import User from '#models/userModel.js';

export default async function verifyEmail(req, res) {
  const { key } = req.query;

  // Check if key is provided
  if (!key) {
    return res.send({
      status: 400,
      message: 'Verification key is required.',
    });
  }

  try {
    await connectDB();
    const user = await User.findOne({ 'activation.key': key });

    // Check if user exists
    if (!user) {
      return res.send({
        status: 400,
        message: 'Verification key is invalid.',
      });
    }

    // Check if user is already verified
    if (user.activation.status === true) {
      return res.send({
        status: 400,
        message: 'Email is already verified.',
      });
    }

    // Update user activation status
    await User.updateOne(
      { 'activation.key': key },
      { 'activation.status': true },
    );

    return res.send({
      status: 200,
      message: 'User successfully verified.',
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: 'Something went wrong while verifying email.',
      data: error,
    });
  }
}
