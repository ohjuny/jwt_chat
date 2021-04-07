const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String,
		required: true
	},
  friends: {
    type: [String]
  }
});

UserSchema.pre(
  'save',
  async function(next) {
    const user = this;
    this.fname = this.fname.charAt(0).toUpperCase() + this.fname.slice(1);
    this.lname = this.lname.charAt(0).toUpperCase() + this.lname.slice(1);
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
);

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;