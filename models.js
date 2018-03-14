'use strict'

const userSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userName: {type: String, required: true},
  passWord: {type: String, required: true},
  userEmail: {type: String, required: true}
});
const User = mongoose.model('User', userSchema);
module.exports = {User};
