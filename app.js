require('dotenv').config();
// node modules
const http = require('http');
// npm modules
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
// app modules
const { urlNotFound } = require('./helpers/response');
const { requireApiKey } = require('./middlewares/apiRequest');
const mongoose = require('./database/mongoose');

// express instance
const app = express();

// Database setup
mongoose.connect();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/api/v1', requireApiKey, require('./routes/V1'));

// error handler
app.use((req, res, next) => {
  return next(urlNotFound());
});

app.use((err, req, res, next) => {
  const error = err;
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: error.message ? error.message : err,
  });

  console.log(chalk.red('Error:', err));
});

// server setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, (err) => {
  if (err) {
    console.log(chalk.red(`Error : ${err}`));
    process.exit(-1);
  }
  console.log(chalk.blue(`${process.env.APP} is running on ${port}`));
});

module.exports = server;
