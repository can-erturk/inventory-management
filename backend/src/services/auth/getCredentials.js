import getUser from '#src/lib/helpers/getUser.js';

export default async function getCredentials(req, res) {
  const { jwt } = req.body;

  // If user or password is not provided
  if (!jwt) {
    return res.send({
      status: 400,
      message: 'You must provide a jwt token.',
    });
  }

  // Solve token and try to get user
  const user = await getUser(jwt);

  // If user is not found
  if (user.status !== true) {
    return res.send({
      status: 400,
      message: user.message,
    });
  }

  // Return user data
  return res.send({
    status: 200,
    message: user.message,
    data: user.data,
  });
}
