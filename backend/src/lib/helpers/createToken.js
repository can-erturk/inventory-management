import jsonwebtoken from 'jsonwebtoken';
import getEnv from './getEnv.js';

const JWT_SECRET_KEY = getEnv('JWT_SECRET_KEY');

export default function createToken(user) {
  return jsonwebtoken.sign(
    { id: user._id, username: user.username, email: user.email },
    JWT_SECRET_KEY,
    { expiresIn: '30d' },
  );
}
