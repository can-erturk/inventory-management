import solveToken from '#helpers/solveToken.js';
import getEnv from '#helpers/getEnv.js';

const FRONTEND_BASE_URL = getEnv('FRONTEND_BASE_URL');

export default async function generateURL(req, res) {
  const { jwt } = req.body;

  // Solve token
  const user = await solveToken(jwt);

  return res.send({
    status: 200,
    message: 'URL generated successfully.',
    url: `${FRONTEND_BASE_URL}/access-sharing?id=${user.id}`,
  });
}
