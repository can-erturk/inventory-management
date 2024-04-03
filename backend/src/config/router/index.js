import express from 'express';
import authRoute from './auth.js';
import verificationRoute from './verification.js';
import productsRoute from './products.js';
import ordersRoute from './orders.js';
import accessRoute from './access.js';

const app = express();

app.use('/auth', authRoute);
app.use('/verification', verificationRoute);
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
app.use('/access', accessRoute);

export default app;
