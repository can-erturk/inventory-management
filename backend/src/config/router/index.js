import express from 'express';
import authRoute from './auth.js';
import verificationRoute from './verification.js';
import productsRoute from './products.js';
import ordersRoute from './orders.js';
import shareAccessRoute from './shareAccess.js';

const app = express();

app.use('/auth', authRoute);
app.use('/verification', verificationRoute);
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
app.use('/share-access', shareAccessRoute);

export default app;
