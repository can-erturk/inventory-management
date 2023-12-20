import connectDB from '#src/lib/mongodb/connectDB.js';
import User from '#src/lib/mongodb/models/User.model.js';

export default async function verifyEmail(req, res) {
  const { key, callbackUrl } = req.query;

  // Check if key is provided
  if (!key) {
    return res.send({
      status: 400,
      message: 'Verification key is required.',
    });
  }

  try {
    await connectDB();
    const user = await User.findOne({ 'activation.code': key });

    // Check if user exists
    if (!user) {
      return res.send({
        status: 400,
        message: 'User not found.',
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
      { 'activation.code': key },
      { 'activation.status': true },
    );

    if (!callbackUrl) {
      return res.send({
        status: 200,
        message: 'User successfully verified.',
      });
    } else {
      return res.redirect(callbackUrl);
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: 'Something went wrong while verifying email.',
      data: error,
    });
  }
}
