'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL } = require('./config');
const { User } = require('./models');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/users', (req, res => {
  const requiredFields = ['']
}))

if (require.main === module) {
  app.listen(process.env.PORT || 8081, function() {
    console.info(`your app is listening on ${this.address().port}`)
  });
}

module.exports = app;
