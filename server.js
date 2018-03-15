'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtstrategy } = require('./auth');
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL } = require('./config');
const app = express();
app.use(morgan('common'));
app.use(express.static('public'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', 'Content-type, Authorization');
  res.header('Access-Control-Allow-Methods', GET, POST, PUT, PATCH, DELETE);
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);
app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
const jwtAuth = passport.authenticate('jwt', { session: false });
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({

  });
});


if (require.main === module) {
  app.listen(process.env.PORT || 8081, function() {
    console.info(`your app is listening on ${this.address().port}`)
  });
}

module.exports = app;
