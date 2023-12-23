export default async function productsMiddleware(req, res, next) {
  const { product_id } = req.body;

  if (!product_id) {
    return res.send({
      status: 400,
      message: 'Product ID is required.',
    });
  }

  next();
}
