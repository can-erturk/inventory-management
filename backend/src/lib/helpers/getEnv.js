import dotenv from 'dotenv';

dotenv.config();

const getEnv = (key) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing env var ${key}`);
  }

  return value;
};

export default getEnv;
