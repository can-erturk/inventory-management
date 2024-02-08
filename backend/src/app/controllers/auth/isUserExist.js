export default async function isUserExist(req, res) {
  // All checks are in the middleware.
  // Just return success
  return res.send({
    status: 200,
    message: 'User exist',
  });
}
