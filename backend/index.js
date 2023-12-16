import express from 'express';

// App configs
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log('App listening on port: ' + port);
});
