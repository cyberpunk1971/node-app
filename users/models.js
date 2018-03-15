'use strict'

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userName: {type: String, required: true, unique: true},
  passWord: {type: String, required: true},
  userEmail: {type: String, required: true}
});

userSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  };
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}
const User = mongoose.model('User', userSchema);
module.exports = {User};
