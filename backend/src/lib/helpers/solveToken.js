import jsonwebtoken from 'jsonwebtoken';
import getEnv from './getEnv.js';

const JWT_SECRET_KEY = getEnv('JWT_SECRET_KEY');

export default async function solveToken(jwt) {
  try {
    return jsonwebtoken.verify(jwt, JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return {
          status: false,
          message: err.message,
        };
      } else {
        return {
          status: true,
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
        };
      }
    });
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}
