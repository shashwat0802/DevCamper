const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bootcamps = require('./routes/bootcamps');
const app = express();

// look for enviornment variables
dotenv.config({ path: './config/config.env' });

// declaring global middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// getting routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
// listen
app.listen(
  PORT,
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode `)
);
