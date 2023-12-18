import connectDB from '../../lib/mongodb/connectDB.js';
import User from '../../lib/mongodb/models/User.model.js';
import jsonwebtoken from 'jsonwebtoken';
import getEnv from '../../lib/helpers/getEnv.js';

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

    return jsonwebtoken.verify(jwt, JWT_SECRET_KEY, async (err, decoded) => {
      if (!err) {
        const user = await User.findOne({ username: decoded.username });

        if (user) {
          return res.send({
            status: 200,
            message: 'User found.',
            data: {
              username: user.username,
              email: user.email,
              activation: user.activation.status,
            },
          });
        }

        return res.send({
          status: 400,
          message: 'User is not found!',
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
      status: 400,
      message: error.message,
    });
  }
}
