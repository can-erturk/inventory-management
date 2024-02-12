import express from 'express';
import checkJwt from '#middlewares/checkJwt.js';
import checkOrderID from '#middlewares/checkOrderID.js';
import getOrders from '#controllers/orders/getOrders.js';
import createOrder from '#controllers/orders/createOrder.js';
import updateOrder from '#controllers/orders/updateOrder.js';
import deleteOrder from '#controllers/orders/deleteOrder.js';

const app = express();

app.use(checkJwt);

app.post('/get', checkOrderID, (req, res) => {
  return getOrders(req, res);
});

app.post('/create', (req, res) => {
  return createOrder(req, res);
});

app.post('/update', checkOrderID, (req, res) => {
  return updateOrder(req, res);
});

app.post('/delete', checkOrderID, (req, res) => {
  return deleteOrder(req, res);
});

export default app;
