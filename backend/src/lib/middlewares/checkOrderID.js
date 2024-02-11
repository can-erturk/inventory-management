export default async function ordersMiddleware(req, res, next) {
  const { order_id } = req.body;

  if (!order_id) {
    return res.send({
      status: 400,
      message: 'Order ID is required.',
    });
  }

  next();
}
