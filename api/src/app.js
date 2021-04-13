const express = require('express');
const indexRouter = require('./routes');

// initialize the express app
const app = express();
const port = process.env.PORT;

// add middlewares and routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', indexRouter);

module.exports = app;
