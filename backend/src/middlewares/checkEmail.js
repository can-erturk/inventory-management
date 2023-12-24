import connectDB from '#src/lib/mongodb/connectDB.js';
import User from '#src/lib/mongodb/models/User.model.js';
import { emailRegex } from '#src/lib/helpers/regex.js';

export default async function checkEmail(req, res, next) {
  const { email } = req.query;

  if (!email || !emailRegex.test(email)) {
    return res.send({
      status: 400,
      message: 'Email is required.',
    });
  }

  try {
    await connectDB();
    const user = await User.findOne({ email });

    if (user) {
      return next();
    } else {
      return res.send({
        status: 400,
        message: 'User not found.',
      });
    }
  } catch (error) {
    return res.send({
      status: 400,
      message: 'Email is invalid.',
    });
  }
}
