const express = require('express');
const dotenv = require('dotenv');

// look for enviornment variables
dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/request', (req, res) => {
  console.log(req);
  res.send('hello');
});

const PORT = process.env.PORT || 5000;
// listen
app.listen(
  PORT,
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode `)
);
