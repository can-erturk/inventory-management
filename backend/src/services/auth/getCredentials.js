import connectDB from '#src/lib/mongodb/connectDB.js';
import User from '#src/lib/mongodb/models/User.model.js';
import jsonwebtoken from 'jsonwebtoken';
import getEnv from '#src/lib/helpers/getEnv.js';

const JWT_SECRET_KEY = getEnv('JWT_SECRET_KEY');

export default async function getCredentials(req, res) {
  const { jwt } = req.body;

  // If user or password is not provided
  if (!jwt) {
    return res.send({
      status: 400,
      message: 'You must provide a jwt token.',
    });
  }

  try {
    await connectDB();

    // Verify jwt token and return user data if jwt is valid
    return jsonwebtoken.verify(jwt, JWT_SECRET_KEY, async (err, decoded) => {
      if (!err) {
        const user = await User.findOne({ username: decoded.username });

        // If user doesn't exist
        if (!user) {
          return res.send({
            status: 400,
            message: 'User is not found!',
          });
        }

        // If user exists return user data
        return res.send({
          status: 200,
          message: 'User found.',
          data: {
            username: user.username,
            email: user.email,
            activation: user.activation.status,
          },
        });
      } else {
        return res.send({
          status: 400,
          message: err.message,
        });
      }
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: error.message,
    });
  }
}
