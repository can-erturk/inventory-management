import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoute from './src/routes/auth.js';

// App configs
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use(
  cors({
    origin: '*',
  }),
);

// Routes
app.use('/auth', authRoute);

app.get('*', (req, res) => {
  res.send({ status: 404, message: 'Requested resource not found' });
});

// Start server
app.listen(port, () => {
  console.log('App listening on port: ' + port);
});
