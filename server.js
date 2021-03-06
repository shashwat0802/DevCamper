const express = require('express');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// look for enviornment variables
dotenv.config({ path: './config/config.env' });

const morgan = require('morgan');
const app = express();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const bootcamps = require('./routes/bootcamps');
const auth = require('./routes/auth');

// body parser
app.use(express.json());
// cookies
app.use(cookieParser());

// connect to database
connectDB();

// declaring global middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// getting routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/auth', auth);

// error handler middle below routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// listen
const server = app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold
  )
);

// custom error handling if mongo fail we want the app to crash
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error : ${error.message}`.red.underline.bold);
  // close the server
  server.close(() => process.exit(1));
});
