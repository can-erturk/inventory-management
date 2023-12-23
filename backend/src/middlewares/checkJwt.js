import solveToken from '#src/lib/helpers/solveToken.js';

export default async function productsMiddleware(req, res, next) {
  const { jwt } = req.body;

  if (!jwt) {
    return res.send({
      status: 400,
      message: 'Access token is required',
    });
  }

  const solvedToken = await solveToken(jwt);

  if (solvedToken.status !== true) {
    return res.send({
      status: 400,
      message: 'Invalid access token',
    });
  }

  next();
}
