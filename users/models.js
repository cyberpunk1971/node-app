'use strict'
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  medications: [
    { type: mongoose.Schema.Types.ObjectId,
      ref: 'Medication', unique: false, required: [true, 'No Medication id found'] }
  ]
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstname: this.firstname || '',
    lastname: this.lastname || '',
    id: this._id || ''
  };
};
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};
UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

const medSchema = mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  form: {
    type: String,
    default: ''
  },
  gname: {
    type: String,
    default: ''
  },
  route: {
    type: String,
    default: ''
  },
  active: {
    type: String,
    default: ''
  },
  fdaid: {
    type: String,
    default: ''
  }
});



medSchema.methods.serialize = function() {
  return {
    name: this.name || '',
    form: this.form || '',
    gname: this.gname || '',
    route: this.route || '',
    active: this.active || '',
    fdaid: this.fdaid || '',
    id: this._id || ''

  };
};
const Medication = mongoose.model('Medication', medSchema);
module.exports = {User, Medication};
