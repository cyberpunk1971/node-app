'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtstrategy } = require('./auth');
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL } = require('./config');
const { User } = require('./models');
const app = express();
app.use(morgan('common'));
app.use(express.static('public'));

app.post('/users', (req, res => {
  const requiredFields = ['']
}))

if (require.main === module) {
  app.listen(process.env.PORT || 8081, function() {
    console.info(`your app is listening on ${this.address().port}`)
  });
}

module.exports = app;
