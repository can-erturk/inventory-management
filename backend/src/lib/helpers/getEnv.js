import dotenv from 'dotenv';

dotenv.config();

const getEnv = (key) => {
  const value = process.env[key];

  if (!value) {
    console.log(
      '\x1b[31m' + `[app] Environment variable '${key}' is missing` + '\x1b[0m',
    );
    return process.exit(1);
  }

  return value;
};

export default getEnv;
