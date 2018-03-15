'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();
router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password'];
  const missingFields = requiredFields.find(field => !(field in req.body));
})
